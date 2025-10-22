<?php

namespace App\Http\Controllers;

use App\Models\CareLog;
use App\Models\ContactMessage;
use App\Models\CV;
use App\Models\JobApply;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $totalCaregivers = CV::all()->count();
        $totalJobApplies = JobApply::all()->count();
        $totalPatients = Patient::all()->count();
        $totalContactMessages = ContactMessage::all()->count();
        $totalCareLogs = CareLog::all()->count();
        return Inertia::render('Admin/Dashboard/Dashboard', [
            'totalCaregivers' => $totalCaregivers,
            'totalJobApplies' => $totalJobApplies,
            'totalPatients' => $totalPatients,
            'totalContactMessages' => $totalContactMessages,
            'totalCareLogs' => $totalCareLogs,
        ]);
    }
}
