<?php

namespace App\Http\Controllers;

use App\Models\CareLog;
use App\Models\ContactMessage;
use App\Models\CV;
use App\Models\JobApply;
use App\Models\Patient;
use Carbon\Carbon;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    private const RECENT_CARE_LOG_DAYS = 3;

    public function index()
    {
        $totalCaregivers = CV::count();
        $totalJobApplies = JobApply::count();
        $totalPatients = Patient::count();
        $totalContactMessages = ContactMessage::count();
        $totalCareLogs = CareLog::count();

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
            'totalCaregivers' => $totalCaregivers,
            'totalJobApplies' => $totalJobApplies,
            'totalPatients' => $totalPatients,
            'totalContactMessages' => $totalContactMessages,
            'totalCareLogs' => $totalCareLogs,
            'recentCareLogs' => $recentCareLogs,
            'missingCareLogWarnings' => $missingCareLogWarnings,
            'recentCareLogDays' => self::RECENT_CARE_LOG_DAYS,
        ]);
    }
}
