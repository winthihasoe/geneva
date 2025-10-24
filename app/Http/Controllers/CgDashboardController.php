<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\CareLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CgDashboardController extends Controller
{
    public function dashboard()
    {
        $caregiver = auth()->user();
        $hasCv = $caregiver->cv()->exists(); // Check if CV exists
        $approvedCV = $caregiver->cv()->where('is_approved', true)->exists(); // Check if CV is approved
        return Inertia::render('Caregiver/CgDashboard' ,[
            'hasCv' => $hasCv,
            'approvedCV' => $approvedCV,
        ]);
    }

    public function newbornCareLogs()
    {
        $user = Auth::user();
        $caregiverName = $user->cv->full_name ?? 'Caregiver';
        $cvId = $user->cv ? $user->cv->id : null;

        // Fetch the last newborn care log for this caregiver
        $lastNewbornCareLog = CareLog::where('cv_id', $cvId)
            ->where('care_type', 'newborn')
            ->orderBy('care_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->first();

        // Only send the fields needed for "continue"
        $lastCareLogData = null;
        if ($lastNewbornCareLog) {
            $lastCareLogData = [
                'date' => $lastNewbornCareLog->care_date,
                'firstName' => $lastNewbornCareLog->first_name,
                'age' => $lastNewbornCareLog->age_display,
                'weight' => $lastNewbornCareLog->weight_kg,
                'height' => $lastNewbornCareLog->height_cm,
            ];
        }

        return Inertia::render('Caregiver/CareLogs/NewbornCareLog/NewbornCareLogs', [
            'caregiverName' => $caregiverName,
            'lastCareLog' => $lastCareLogData,
        ]);
    }

    public function maternalCareLogs()
    {
        $user = Auth::user();
        $caregiverName = $user->cv->full_name ?? 'Caregiver';
        $cvId = $user->cv ? $user->cv->id : null;

        // Fetch the last maternal care log for this caregiver
        $lastMaternalCareLog = \App\Models\CareLog::where('cv_id', $cvId)
            ->where('care_type', 'maternal')
            ->orderBy('care_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->first();

        $lastCareLogData = null;
        if ($lastMaternalCareLog) {
            $lastCareLogData = [
                'date' => $lastMaternalCareLog->care_date,
                'firstName' => $lastMaternalCareLog->first_name,
                'lastName' => $lastMaternalCareLog->last_name,
                'age' => $lastMaternalCareLog->age_display,
                'gestationalAge' => $lastMaternalCareLog->gestational_age,
                'weight' => $lastMaternalCareLog->weight_kg,
                'height' => $lastMaternalCareLog->height_cm,
            ];
        }

        return Inertia::render('Caregiver/CareLogs/MaternalCareLog/MaternalCareLogs', [
            'caregiverName' => $caregiverName,
            'lastCareLog' => $lastCareLogData,
        ]);
    }

    public function elderlyCareLogs()
    {
       $user = Auth::user();
        $caregiverName = $user->cv->full_name ?? 'Caregiver';
        $cvId = $user->cv ? $user->cv->id : null;

        // Fetch the last elderly care log for this caregiver
        $lastElderlyCareLog = \App\Models\CareLog::where('cv_id', $cvId)
            ->where('care_type', 'elder')
            ->orderBy('care_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->first();

        $lastCareLogData = null;
        if ($lastElderlyCareLog) {
            $lastCareLogData = [
                'date' => $lastElderlyCareLog->care_date,
                'firstName' => $lastElderlyCareLog->first_name,
                'lastName' => $lastElderlyCareLog->last_name,
                'age' => $lastElderlyCareLog->age_display,
                'weight' => $lastElderlyCareLog->weight_kg,
                'height' => $lastElderlyCareLog->height_cm,
            ];
        }

        return Inertia::render('Caregiver/CareLogs/ElderlyCareLog/ElderlyCareLogs', [
            'caregiverName' => $caregiverName,
            'lastCareLog' => $lastCareLogData,
        ]);
    }

    // Show all care logs for the authenticated caregiver
    public function myCareLogs()
    {
        $user = Auth::user();
        
        // Get the CV ID for the authenticated user
        $cvId = $user->cv ? $user->cv->id : null;
        
        // Fetch care logs with related data
        $careLogs = CareLog::where('cv_id', $cvId)
            ->with([
                'emotionBehavior',
                'feedingRecords',
                'diaperChanges', 
                'sleepRecords',
                'activityRecords',
                'hygieneRecords',
                'vitalSigns',
                'requestedSupplies',
                'patient', // If you have patient relationship
                'carePlan' // If you have care plan relationship
            ])
            ->orderBy('care_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(10); // Paginate for better performance

        // Get summary statistics
        $stats = [
            'total_logs' => CareLog::where('cv_id', $cvId)->count(),
            'this_month' => CareLog::where('cv_id', $cvId)
                ->whereMonth('care_date', now()->month)
                ->whereYear('care_date', now()->year)
                ->count(),
            'this_week' => CareLog::where('cv_id', $cvId)
                ->whereBetween('care_date', [
                    now()->startOfWeek(),
                    now()->endOfWeek()
                ])
                ->count(),
            'by_type' => CareLog::where('cv_id', $cvId)
                ->selectRaw('care_type, count(*) as count')
                ->groupBy('care_type')
                ->pluck('count', 'care_type')
                ->toArray()
        ];

        // Recent activity (last 5 logs)
        $recentLogs = CareLog::where('cv_id', $cvId)
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get(['id', 'first_name', 'last_name', 'care_type', 'care_date', 'created_at']);

        return Inertia::render('Caregiver/CareLogs/MyCareLogs', [
            'careLogs' => $careLogs,
            'stats' => $stats,
            'recentLogs' => $recentLogs,
            'filters' => [
                'care_types' => ['newborn', 'maternal', 'elder'],
                'date_ranges' => [
                    'today' => now()->toDateString(),
                    'this_week' => [now()->startOfWeek()->toDateString(), now()->endOfWeek()->toDateString()],
                    'this_month' => [now()->startOfMonth()->toDateString(), now()->endOfMonth()->toDateString()],
                ]
            ]
        ]);
    }

    // Add method for filtering care logs (optional)
    public function filterCareLogs(Request $request)
    {
        $user = Auth::user();
        $cvId = $user->cv ? $user->cv->id : null;

        $query = DB::table('care_logs')
            ->where('cv_id', $cvId) // <-- Only logs for this caregiver
            ->orderBy('care_date', 'desc');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                ->orWhere('last_name', 'like', "%{$search}%")
                ->orWhere('caregiver_name', 'like', "%{$search}%");
            });
        }
        if ($request->filled('care_type')) {
            $query->where('care_type', $request->care_type);
        }
        if ($request->filled('date_from')) {
            $query->where('care_date', '>=', $request->date_from);
        }
        if ($request->filled('date_to')) {
            $query->where('care_date', '<=', $request->date_to);
        }

        $careLogs = $query->paginate(20)->appends($request->all());

        return Inertia::render('Caregiver/CareLogs/MyCareLogs', [
            'careLogs' => $careLogs,
            'filters' => [
                'search' => $request->search,
                'care_types' => ['newborn', 'maternal', 'elder'],
                'date_from' => $request->date_from,
                'date_to' => $request->date_to,
            ],
        ]);
    }

    // Add method for getting single care log details (for PDF generation or viewing)
    public function getCareLogDetails($id)
    {
        $user = Auth::user();
        $cvId = $user->cv ? $user->cv->id : null;

        $careLog = CareLog::where('cv_id', $cvId)
            ->where('id', $id)
            ->with([
                'emotionBehavior',
                'feedingRecords',
                'diaperChanges', 
                'sleepRecords',
                'activityRecords',
                'hygieneRecords',
                'vitalSigns',
                'requestedSupplies'
            ])
            ->firstOrFail();

        return response()->json([
            'careLog' => $careLog
        ]);
    }
}
