<?php

namespace Tests\Feature;

use App\Models\CV;
use App\Models\CaregiverAssignmentNote;
use App\Models\CaseRecord;
use App\Models\JobApply;
use App\Models\Patient;
use App\Models\PatientCaregiverAssignment;
use App\Models\PatientFeedback;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminDashboardStatsTest extends TestCase
{
    use DatabaseTransactions;

    public function test_dashboard_stats_show_two_counts_on_each_card(): void
    {
        $admin = $this->createUser(['is_admin' => true]);

        $occupiedBefore = CV::query()->where('status', 'Occupied')->count();
        $availableBefore = CV::query()->where('status', 'Available')->count();
        $recruitBefore = JobApply::query()->whereRaw('LOWER(status) = ?', ['recruit'])->count();
        $pendingJobsBefore = JobApply::query()->whereRaw('LOWER(status) = ?', ['pending'])->count();
        $openInquiriesBefore = CaseRecord::query()->where('status', 'open')->count();
        $confirmedBefore = CaseRecord::query()->where('status', 'confirmed')->count();
        $childBefore = Patient::query()
            ->whereIn('type', ['Baby', 'Newborn'])
            ->whereHas('caregiverAssignments', fn ($query) => $query->whereNull('end_date'))
            ->count();
        $elderlyBefore = Patient::query()
            ->where('type', 'Elder')
            ->whereHas('caregiverAssignments', fn ($query) => $query->whereNull('end_date'))
            ->count();

        $this->createCv('Occupied');
        $this->createCv('Available');
        $this->createCv('Leave');

        $this->createJobApply(['status' => 'recruit', 'decision' => 'recruit', 'source' => 'manual']);
        $this->createJobApply(['status' => 'pending', 'decision' => 'pending', 'source' => 'manual']);
        $this->createJobApply(['status' => 'Pending', 'decision' => 'pending', 'source' => 'website']);
        $this->createJobApply(['status' => 'Contacted', 'decision' => 'pending', 'source' => 'website']);

        $this->createCase(['name' => 'Waiting inquiry', 'status' => 'open']);
        $this->createCase([
            'name' => 'CV already sent',
            'status' => 'cv_sent',
            'cv_sent_at' => '2026-09-20 10:00:00',
        ]);
        $this->createCase([
            'name' => 'Has interview date',
            'status' => 'interviewing',
            'interview_date' => '2026-09-21',
        ]);
        $this->createCase([
            'name' => 'Has response',
            'status' => 'open',
            'client_response' => 'Will call back',
        ]);
        $this->createCase(['name' => 'Cancelled inquiry', 'status' => 'cancelled']);
        $this->createCase(['name' => 'Confirmed case', 'status' => 'confirmed']);
        $this->createCase(['name' => 'On duty case', 'status' => 'on_duty']);

        $occupiedCv = $this->createCv('Occupied');
        $this->assignCaregiver($this->createPatient('Baby'), $occupiedCv, $admin);
        $this->assignCaregiver($this->createPatient('Newborn'), $this->createCv('Occupied'), $admin);
        $this->assignCaregiver($this->createPatient('Elder'), $this->createCv('Occupied'), $admin);
        $this->createPatient('Baby');
        $this->assignCaregiver($this->createPatient('Elder'), $this->createCv('Available'), $admin, '2026-09-01');
        $this->assignCaregiver($this->createPatient('Maternal'), $this->createCv('Occupied'), $admin);

        $this->actingAs($admin)
            ->get(route('admin.dashboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Dashboard/Dashboard')
                ->where('occupiedCaregivers', $occupiedBefore + 5)
                ->where('availableCaregivers', $availableBefore + 2)
                ->where('recruitJobApplies', $recruitBefore + 1)
                ->where('pendingJobApplies', $pendingJobsBefore + 2)
                ->where('openInquiries', $openInquiriesBefore + 2)
                ->where('confirmedCases', $confirmedBefore + 1)
                ->where('childCarePatients', $childBefore + 2)
                ->where('elderlyCarePatients', $elderlyBefore + 1)
                ->missing('totalCaregivers')
                ->missing('totalJobApplies')
                ->missing('totalCareLogs')
                ->missing('totalContactMessages')
                ->missing('totalPatients')
            );
    }

    public function test_dashboard_trends_cover_the_last_six_months(): void
    {
        Carbon::setTestNow(Carbon::parse('2026-09-29 12:00:00'));

        try {
            $admin = $this->createUser(['is_admin' => true]);
            $caseDate = 'COALESCE(inquiry_at, created_at)';

            $julyInquiries = $this->monthCount(
                CaseRecord::query()->whereIn('status', ['open', 'cv_sent', 'interviewing']),
                $caseDate,
                '2026-07',
            );
            $julyConfirmed = $this->monthCount(
                CaseRecord::query()->whereIn('status', ['confirmed', 'on_duty']),
                $caseDate,
                '2026-07',
            );
            $septemberInquiries = $this->monthCount(
                CaseRecord::query()->whereIn('status', ['open', 'cv_sent', 'interviewing']),
                $caseDate,
                '2026-09',
            );
            $septemberConfirmed = $this->monthCount(
                CaseRecord::query()->whereIn('status', ['confirmed', 'on_duty']),
                $caseDate,
                '2026-09',
            );
            $septemberCancelled = $this->monthCount(
                CaseRecord::query()->where('status', 'cancelled'),
                $caseDate,
                '2026-09',
            );
            $augustRecruit = $this->monthCount(
                JobApply::query()->whereRaw(
                    "LOWER(REPLACE(status, ' ', '_')) IN (?, ?)",
                    ['recruit', 'part_time'],
                ),
                'created_at',
                '2026-08',
            );
            $augustCvs = $this->monthCount(CV::query(), 'created_at', '2026-08');

            $this->createCase([
                'name' => 'July confirmed',
                'status' => 'confirmed',
                'inquiry_at' => '2026-07-08 09:30:00',
            ]);
            $this->createCase([
                'name' => 'July on duty',
                'status' => 'on_duty',
                'inquiry_at' => '2026-07-09 09:30:00',
            ]);
            $this->createCase([
                'name' => 'September open',
                'status' => 'open',
                'inquiry_at' => '2026-09-03 11:00:00',
            ]);
            $this->createCase([
                'name' => 'September CV sent',
                'status' => 'cv_sent',
                'inquiry_at' => '2026-09-04 11:00:00',
            ]);
            $this->createCase([
                'name' => 'September interviewing',
                'status' => 'interviewing',
                'inquiry_at' => '2026-09-05 11:00:00',
            ]);
            $this->createCase([
                'name' => 'September confirmed',
                'status' => 'confirmed',
                'inquiry_at' => '2026-09-06 11:00:00',
            ]);
            $this->createCase([
                'name' => 'September cancelled',
                'status' => 'cancelled',
                'inquiry_at' => '2026-09-07 11:00:00',
            ]);
            $this->createCase([
                'name' => 'March case outside the window',
                'status' => 'confirmed',
                'inquiry_at' => '2026-03-02 11:00:00',
            ]);

            $recruit = $this->createJobApply([
                'status' => 'recruit',
                'decision' => 'recruit',
            ]);
            $recruit->created_at = Carbon::parse('2026-08-10 08:00:00');
            $recruit->save();

            $partTime = $this->createJobApply([
                'status' => 'part_time',
                'decision' => 'part_time',
            ]);
            $partTime->created_at = Carbon::parse('2026-08-11 08:00:00');
            $partTime->save();

            $pending = $this->createJobApply(['status' => 'pending']);
            $pending->created_at = Carbon::parse('2026-08-12 08:00:00');
            $pending->save();

            $cv = $this->createCv('Available');
            $cv->created_at = Carbon::parse('2026-08-13 08:00:00');
            $cv->save();

            $oldCv = $this->createCv('Available');
            $oldCv->created_at = Carbon::parse('2026-03-12 08:00:00');
            $oldCv->save();

            $septemberInquiryCount = $septemberInquiries + 3;
            $septemberConfirmedCount = $septemberConfirmed + 1;
            $septemberCancelledCount = $septemberCancelled + 1;
            $augustRecruitCount = $augustRecruit + 2;
            $augustCvCount = $augustCvs + 1;

            $this->actingAs($admin)
                ->get(route('admin.dashboard'))
                ->assertOk()
                ->assertInertia(fn (Assert $page) => $page
                    ->has('caseTrend', 6)
                    ->has('recruitmentTrend', 6)
                    ->where('caseTrend.0.label', '04-26')
                    ->where('caseTrend.3.label', '07-26')
                    ->where('caseTrend.4.label', '08-26')
                    ->where('caseTrend.5.label', '09-26')
                    ->where('caseTrend.3.inquiries', $julyInquiries)
                    ->where('caseTrend.3.confirmed', $julyConfirmed + 2)
                    ->where('caseTrend.5.inquiries', $septemberInquiryCount)
                    ->where('caseTrend.5.confirmed', $septemberConfirmedCount)
                    ->where('caseTrend.5.cancelled', $septemberCancelledCount)
                    ->where('caseTrend.5.rate', $this->percent(
                        $septemberConfirmedCount,
                        $septemberInquiryCount + $septemberConfirmedCount + $septemberCancelledCount,
                    ))
                    ->where('recruitmentTrend.4.label', '08-26')
                    ->where('recruitmentTrend.4.recruit', $augustRecruitCount)
                    ->where('recruitmentTrend.4.cvs', $augustCvCount)
                    ->where('recruitmentTrend.4.rate', $this->percent($augustCvCount, $augustRecruitCount))
                );
        } finally {
            Carbon::setTestNow();
        }
    }

    public function test_dashboard_lists_the_latest_five_complaints_and_feedbacks(): void
    {
        $admin = $this->createUser(['is_admin' => true]);

        foreach (range(1, 6) as $index) {
            $patient = $this->createPatient('Elder');
            $assignment = $this->assignCaregiver($patient, $this->createCv('Occupied'), $admin);
            $note = CaregiverAssignmentNote::create([
                'patient_caregiver_assignment_id' => $assignment->id,
                'kind' => 'complaint',
                'body' => "Complaint {$index}",
                'recorded_by' => $admin->id,
            ]);
            CaregiverAssignmentNote::query()->whereKey($note->id)->update([
                'created_at' => sprintf('2037-01-%02d 09:00:00', $index),
                'updated_at' => sprintf('2037-01-%02d 09:00:00', $index),
            ]);
        }

        $feedbackPatient = $this->createPatient('Baby');
        foreach (range(1, 6) as $index) {
            $feedback = PatientFeedback::create([
                'patient_id' => $feedbackPatient->id,
                'body' => "Feedback {$index}",
                'recorded_by' => $admin->id,
            ]);
            PatientFeedback::query()->whereKey($feedback->id)->update([
                'created_at' => sprintf('2037-03-%02d 14:30:00', $index),
                'updated_at' => sprintf('2037-03-%02d 14:30:00', $index),
            ]);
        }

        $this->actingAs($admin)
            ->get(route('admin.dashboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('latestComplaints', 5)
                ->has('latestFeedbacks', 5)
                ->where('latestComplaints.0.text', 'Complaint 6')
                ->where('latestComplaints.0.staff_name', 'Dashboard Tester')
                ->where('latestComplaints.0.recorded_at', '06-01-2037 09:00')
                ->where('latestComplaints.4.text', 'Complaint 2')
                ->where('latestFeedbacks.0.text', 'Feedback 6')
                ->where('latestFeedbacks.0.staff_name', 'Dashboard Tester')
                ->where('latestFeedbacks.0.recorded_at', '06-03-2037 14:30')
                ->where('latestFeedbacks.4.text', 'Feedback 2')
            );
    }

    private function monthCount($query, string $expression, string $monthKey): int
    {
        $start = now()->copy()->startOfMonth()->subMonths(5);
        $end = now()->copy()->endOfMonth();

        return (int) $query
            ->whereRaw("{$expression} >= ? AND {$expression} <= ?", [$start, $end])
            ->whereRaw("DATE_FORMAT({$expression}, '%Y-%m') = ?", [$monthKey])
            ->count();
    }

    private function percent(int $part, int $whole): ?int
    {
        if ($whole === 0) {
            return null;
        }

        return (int) round(($part / $whole) * 100);
    }

    private function createUser(array $attributes = []): User
    {
        return User::query()->create(array_merge([
            'name' => 'Dashboard Tester',
            'email' => 'dashboard-'.uniqid('', true).'@example.com',
            'password' => 'password',
            'is_admin' => false,
        ], $attributes));
    }

    private function createCv(string $status): CV
    {
        $user = $this->createUser();

        return CV::create([
            'user_id' => $user->id,
            'full_name' => 'Dashboard '.$status.' '.uniqid(),
            'gender' => 'Female',
            'status' => $status,
        ]);
    }

    private function createJobApply(array $attributes): JobApply
    {
        return JobApply::create(array_merge([
            'name' => 'Dashboard candidate '.uniqid(),
            'service_area' => 'Yangon',
            'source' => 'manual',
            'decision' => 'pending',
            'status' => 'pending',
        ], $attributes));
    }

    private function createCase(array $attributes): CaseRecord
    {
        return CaseRecord::create(array_merge([
            'branch' => 'Yangon',
            'name' => 'Dashboard case',
            'status' => 'open',
            'care_type' => 'baby',
        ], $attributes));
    }

    private function createPatient(string $type): Patient
    {
        return Patient::create([
            'type' => $type,
            'first_name' => 'Dashboard '.$type,
            'last_name' => uniqid(),
            'gender' => 'Female',
            'service_area' => 'Yangon',
        ]);
    }

    private function assignCaregiver(Patient $patient, CV $cv, User $admin, ?string $endDate = null): PatientCaregiverAssignment
    {
        return PatientCaregiverAssignment::create([
            'patient_id' => $patient->id,
            'cv_id' => $cv->id,
            'assigned_by' => $admin->id,
            'start_date' => '2026-09-01',
            'end_date' => $endDate,
        ]);
    }
}
