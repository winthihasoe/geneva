<?php

namespace App\Http\Controllers;

use App\Models\CareLog;
use App\Models\CaregiverAssignmentNote;
use App\Models\CaseRecord;
use App\Models\CV;
use App\Models\JobApply;
use App\Models\Patient;
use App\Models\PatientFeedback;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    private const RECENT_CARE_LOG_DAYS = 3;

    private const TREND_MONTHS = 6;

    public function index()
    {
        $occupiedCaregivers = CV::query()->where('status', 'Occupied')->count();
        $availableCaregivers = CV::query()->where('status', 'Available')->count();

        $recruitJobApplies = $this->countJobApplies('recruit');
        $pendingJobApplies = $this->countJobApplies('pending');

        $openInquiries = CaseRecord::query()->where('status', 'open')->count();
        $confirmedCases = CaseRecord::query()->where('status', 'confirmed')->count();

        $childCarePatients = $this->activePatientCount(['Baby', 'Newborn']);
        $elderlyCarePatients = $this->activePatientCount(['Elder']);

        $recentCareLogs = CareLog::query()
            ->with(['cv:id,full_name', 'patient:id,first_name,last_name'])
            ->orderByDesc('care_date')
            ->orderByDesc('created_at')
            ->limit(10)
            ->get()
            ->map(function (CareLog $log) {
                $patientName = $log->patient
                    ? trim($log->patient->first_name.' '.($log->patient->last_name ?? ''))
                    : trim(($log->first_name ?? '').' '.($log->last_name ?? ''));

                return [
                    'id' => $log->id,
                    'care_date' => $log->care_date?->format('d-m-Y'),
                    'care_type' => $log->care_type,
                    'patient_id' => $log->patient_id,
                    'patient_name' => $patientName !== '' ? $patientName : 'Unknown patient',
                    'caregiver_name' => $log->cv->full_name ?? $log->caregiver_name ?? 'Not specified',
                    'age_display' => $log->age_display,
                ];
            });

        $cutoffDate = now()->subDays(self::RECENT_CARE_LOG_DAYS)->toDateString();

        $missingCareLogWarnings = Patient::query()
            ->whereHas('caregiverAssignments', function ($query) {
                $query->whereNull('end_date');
            })
            ->whereDoesntHave('careLogs', function ($query) use ($cutoffDate) {
                $query->where('care_date', '>=', $cutoffDate);
            })
            ->with([
                'caregiverAssignments' => function ($query) {
                    $query->whereNull('end_date')->with('cv:id,full_name');
                },
            ])
            ->withMax('careLogs', 'care_date')
            ->get()
            ->map(function (Patient $patient) {
                $lastLogDate = $patient->care_logs_max_care_date
                    ? Carbon::parse($patient->care_logs_max_care_date)->startOfDay()
                    : null;

                $caregivers = $patient->caregiverAssignments
                    ->filter(fn ($assignment) => $assignment->cv)
                    ->map(fn ($assignment) => $assignment->cv->full_name)
                    ->values()
                    ->all();

                return [
                    'id' => $patient->id,
                    'patient_name' => trim($patient->first_name.' '.($patient->last_name ?? '')),
                    'type' => $patient->type,
                    'caregivers' => $caregivers,
                    'last_care_log_date' => $lastLogDate?->format('d-m-Y'),
                    'days_since_last_log' => $lastLogDate
                        ? (int) $lastLogDate->diffInDays(now()->startOfDay())
                        : null,
                    'warning_type' => $lastLogDate ? 'stale' : 'none',
                ];
            })
            ->sortByDesc(fn ($warning) => $warning['days_since_last_log'] ?? PHP_INT_MAX)
            ->values();

        return Inertia::render('Admin/Dashboard/Dashboard', [
            'occupiedCaregivers' => $occupiedCaregivers,
            'availableCaregivers' => $availableCaregivers,
            'recruitJobApplies' => $recruitJobApplies,
            'pendingJobApplies' => $pendingJobApplies,
            'openInquiries' => $openInquiries,
            'confirmedCases' => $confirmedCases,
            'childCarePatients' => $childCarePatients,
            'elderlyCarePatients' => $elderlyCarePatients,
            'recentCareLogs' => $recentCareLogs,
            'missingCareLogWarnings' => $missingCareLogWarnings,
            'recentCareLogDays' => self::RECENT_CARE_LOG_DAYS,
            'latestComplaints' => $this->latestComplaints(),
            'latestFeedbacks' => $this->latestFeedbacks(),
            'caseTrend' => $this->monthlyCaseTrend(),
            'recruitmentTrend' => $this->monthlyRecruitmentTrend(),
        ]);
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function latestComplaints(): array
    {
        return CaregiverAssignmentNote::query()
            ->where('kind', 'complaint')
            ->with(['recorder:id,name', 'assignment.cv:id,full_name', 'assignment.patient:id,first_name,last_name'])
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->limit(5)
            ->get()
            ->map(function (CaregiverAssignmentNote $note) {
                $item = $this->presentAssignmentNote($note);
                unset($item['sort_at']);

                return $item;
            })
            ->values()
            ->all();
    }

    /**
     * Patient call notes and caregiver-assignment feedback, newest first.
     *
     * @return list<array<string, mixed>>
     */
    private function latestFeedbacks(): array
    {
        $assignmentFeedback = CaregiverAssignmentNote::query()
            ->where('kind', 'feedback')
            ->with(['recorder:id,name', 'assignment.cv:id,full_name', 'assignment.patient:id,first_name,last_name'])
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->limit(5)
            ->get()
            ->map(fn (CaregiverAssignmentNote $note) => $this->presentAssignmentNote($note));

        $patientFeedback = PatientFeedback::query()
            ->with(['recorder:id,name', 'patient:id,first_name,last_name'])
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->limit(5)
            ->get()
            ->map(function (PatientFeedback $feedback) {
                return [
                    'id' => 'patient-'.$feedback->id,
                    'patient_id' => $feedback->patient_id,
                    'text' => $feedback->body,
                    'label' => $feedback->scheduleLabel(),
                    'patient_name' => $this->patientName($feedback->patient),
                    'caregiver_name' => null,
                    'staff_name' => $feedback->recorder->name ?? 'Unknown',
                    'recorded_at' => $feedback->created_at?->format('d-m-Y H:i'),
                    'sort_at' => $feedback->created_at?->getTimestamp() ?? 0,
                ];
            });

        return $assignmentFeedback
            ->concat($patientFeedback)
            ->sortByDesc('sort_at')
            ->take(5)
            ->map(function (array $item) {
                unset($item['sort_at']);

                return $item;
            })
            ->values()
            ->all();
    }

    /**
     * @return array<string, mixed>
     */
    private function presentAssignmentNote(CaregiverAssignmentNote $note): array
    {
        $assignment = $note->assignment;

        return [
            'id' => 'assignment-'.$note->id,
            'patient_id' => $assignment?->patient_id,
            'text' => $note->body,
            'patient_name' => $this->patientName($assignment?->patient),
            'caregiver_name' => $assignment?->cv->full_name ?? null,
            'staff_name' => $note->recorder->name ?? 'Unknown',
            'recorded_at' => $note->created_at?->format('d-m-Y H:i'),
            'sort_at' => $note->created_at?->getTimestamp() ?? 0,
        ];
    }

    private function patientName(?Patient $patient): string
    {
        if (! $patient) {
            return 'Unknown patient';
        }

        $name = trim($patient->first_name.' '.($patient->last_name ?? ''));

        return $name !== '' ? $name : 'Unknown patient';
    }

    private function countJobApplies(string $status): int
    {
        return JobApply::query()
            ->whereRaw('LOWER(status) = ?', [$status])
            ->count();
    }

    /**
     * Cases are grouped by inquiry month and current status.
     * Inquiries are open, CV sent, and interviewing.
     * Confirmed includes on duty. The rate is confirmed ÷ all cases that month.
     *
     * @return list<array{label: string, inquiries: int, confirmed: int, cancelled: int, rate: int|null}>
     */
    private function monthlyCaseTrend(): array
    {
        $date = 'COALESCE(inquiry_at, created_at)';
        $inquiries = $this->countsByMonth(
            CaseRecord::query()->whereIn('status', ['open', 'cv_sent', 'interviewing']),
            $date,
        );
        $confirmed = $this->countsByMonth(
            CaseRecord::query()->whereIn('status', ['confirmed', 'on_duty']),
            $date,
        );
        $cancelled = $this->countsByMonth(
            CaseRecord::query()->where('status', 'cancelled'),
            $date,
        );

        return $this->monthRows(function (string $key) use ($inquiries, $confirmed, $cancelled) {
            $inquiryCount = $inquiries[$key] ?? 0;
            $confirmedCount = $confirmed[$key] ?? 0;
            $cancelledCount = $cancelled[$key] ?? 0;

            return [
                'inquiries' => $inquiryCount,
                'confirmed' => $confirmedCount,
                'cancelled' => $cancelledCount,
                'rate' => $this->percent(
                    $confirmedCount,
                    $inquiryCount + $confirmedCount + $cancelledCount,
                ),
            ];
        });
    }

    /**
     * Recruitment is recruit and part time. CVs are new caregiver records.
     * The rate is new CVs ÷ recruitment for that month.
     *
     * @return list<array{label: string, recruit: int, cvs: int, rate: int|null}>
     */
    private function monthlyRecruitmentTrend(): array
    {
        $recruits = $this->countsByMonth(
            JobApply::query()->whereRaw(
                "LOWER(REPLACE(status, ' ', '_')) IN (?, ?)",
                ['recruit', 'part_time'],
            ),
            'created_at',
        );
        $cvs = $this->countsByMonth(CV::query(), 'created_at');

        return $this->monthRows(function (string $key) use ($recruits, $cvs) {
            $recruitCount = $recruits[$key] ?? 0;
            $cvCount = $cvs[$key] ?? 0;

            return [
                'recruit' => $recruitCount,
                'cvs' => $cvCount,
                'rate' => $this->percent($cvCount, $recruitCount),
            ];
        });
    }

    /**
     * @param  callable(string): array<string, int|null>  $values
     * @return list<array<string, mixed>>
     */
    private function monthRows(callable $values): array
    {
        $rows = [];

        for ($offset = self::TREND_MONTHS - 1; $offset >= 0; $offset--) {
            $month = now()->startOfMonth()->subMonths($offset);
            $rows[] = array_merge([
                'label' => $month->format('m-y'),
            ], $values($month->format('Y-m')));
        }

        return $rows;
    }

    /**
     * @return array<string, int>
     */
    private function countsByMonth(Builder $query, string $expression): array
    {
        $start = now()->copy()->startOfMonth()->subMonths(self::TREND_MONTHS - 1);
        $end = now()->copy()->endOfMonth();

        return $query
            ->whereRaw("{$expression} >= ? AND {$expression} <= ?", [$start, $end])
            ->selectRaw("DATE_FORMAT({$expression}, '%Y-%m') as month_key, COUNT(*) as total")
            ->groupByRaw("DATE_FORMAT({$expression}, '%Y-%m')")
            ->pluck('total', 'month_key')
            ->map(fn ($total) => (int) $total)
            ->all();
    }

    private function percent(int $part, int $whole): ?int
    {
        if ($whole === 0) {
            return null;
        }

        return (int) round(($part / $whole) * 100);
    }

    /**
     * Active means a caregiver is assigned right now.
     *
     * @param  list<string>  $types
     */
    private function activePatientCount(array $types): int
    {
        return Patient::query()
            ->whereIn('type', $types)
            ->whereHas('caregiverAssignments', function (Builder $query) {
                $query->whereNull('end_date');
            })
            ->count();
    }
}
