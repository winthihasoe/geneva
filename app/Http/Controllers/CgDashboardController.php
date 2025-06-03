<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

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
}
