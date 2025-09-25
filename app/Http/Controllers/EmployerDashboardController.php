<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EmployerDashboardController extends Controller
{
    public function employerDashboard()
    {
        $user = auth()->user();
        $bookings =$user->interviews()->with('cv')->get();
        return inertia('Employer/EmployerDashboard', [
            'user' => $user,
            'bookings' => $bookings,
        ]);
    }

    // Edit employer profile
    public function editProfile()
    {
        $user = auth()->user();
        return inertia('Employer/EditProfile', [
            'user' => $user,
        ]);
    }

    // Update employer profile
    public function updateProfile(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
            'current_password' => 'nullable|current_password',
            'password' => 'nullable|min:8|confirmed',
        ]);

        // Update basic profile info
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
        ]);

        // Update password if provided
        if (!empty($validated['password'])) {
            $user->update([
                'password' => bcrypt($validated['password'])
            ]);
        }

        return redirect()->route('employer.dashboard')->with('success', 'Profile updated successfully!');
    }
}
