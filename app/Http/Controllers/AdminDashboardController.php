<?php

namespace App\Http\Controllers;

use App\Models\CV;
use App\Models\JobApply;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $totalCaregivers = CV::all()->count();
        $totalJobApplies = JobApply::all()->count();
        return Inertia::render('Admin/Dashboard/Dashboard', [
            'totalCaregivers' => $totalCaregivers,
            'totalJobApplies' => $totalJobApplies,
        ]);
    }
}
