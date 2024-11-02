<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function getServiceByName($name)
    {
        // Fetch the service by name and load related data
        $service = Service::where('name', $name)
            ->with(['packages.durations.salaries', 'packages.durations.serviceFees'])
            ->first();

        if (!$service) {
            abort(404); // This will display the 404 error page
        }

        return Inertia::render("Pricing/ServicePricing", ['service' => $service]);
    }
}
