<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarePlanController extends Controller
{
    public function startCare ()
    {
        return Inertia::render('CustomizedCare/CustomizedCare');
    }
    
    public function startBabyCare ()
    {
        return Inertia::render('BabyCare/BabyCare');
    }
   
    public function newbornCare ($name)
    {
        $service = Service::where('name', $name)
        ->with(['packages.durations.salaries', 'packages.durations.serviceFees'])
        ->firstOrFail();

        return Inertia::render('BabyCare/NewbornCare/NewbornCare', [
            'service' => $service
        ]);
    }
}
