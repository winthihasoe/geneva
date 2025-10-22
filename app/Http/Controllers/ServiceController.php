<?php

namespace App\Http\Controllers;

use App\Models\Salary;
use App\Models\Service;
use App\Models\ServiceFee;
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

    // Admin view for service pricings
    public function adminServicePricings()
    {
        $services = Service::with(['packages.durations.salaries', 'packages.durations.serviceFees'])->get();
        return Inertia::render("Admin/Pricing/PricingManagement", ['services' => $services]);
    }

    // Edit Service Title (name)
    public function updateServiceTitle(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        // dd($request->all());
        $service = Service::findOrFail($id);
        $service->name = $request->name;
        $service->save();

        return back()->with('success', 'Service title updated successfully.');
    }

    // Delete Service (Level)
    public function deleteService($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return back()->with('success', 'Service deleted successfully.');
    }

    // Edit Salary
    public function updateSalary(Request $request, $id)
    {

        $request->validate([
            'amount' => 'required|numeric|min:0',
        ]);
        $salary = Salary::findOrFail($id);
        $salary->amount = $request->amount;
        $salary->save();

        return back()->with('success', 'Salary updated successfully.');
    }

    // Delete Salary
    public function deleteSalary($id)
    {
        $salary = Salary::findOrFail($id);
        $salary->delete();

        return back()->with('success', 'Salary deleted successfully.');
    }

    // Edit Service Fee
    public function updateServiceFee(Request $request, $id)
    {
        $request->validate([
            'fee' => 'required|numeric|min:0',
        ]);
        $serviceFee = ServiceFee::findOrFail($id);
        $serviceFee->fee = $request->fee;
        $serviceFee->save();

        return back()->with('success', 'Service fee updated successfully.');
    }

    // Delete Service Fee
    public function deleteServiceFee($id)
    {
        $serviceFee = ServiceFee::findOrFail($id);
        $serviceFee->delete();

        return back()->with('success', 'Service fee deleted successfully.');
    }
}
