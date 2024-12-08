<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CgDashboardController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Caregiver/CgDashboard');
    }
}
