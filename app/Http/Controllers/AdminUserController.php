<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    public function index(Request $request)
    {
        $filters = [
            'search' => $request->string('search')->trim()->toString(),
            'role' => $request->string('role')->trim()->toString(),
        ];

        $users = User::query()
            ->select([
                'id',
                'name',
                'email',
                'is_admin',
                'is_super_admin',
                'is_caregiver',
                'is_employer',
                'last_active_at',
                'created_at',
            ])
            ->when($filters['search'] !== '', function ($query) use ($filters) {
                $search = $filters['search'];
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($filters['role'] !== '', function ($query) use ($filters) {
                match ($filters['role']) {
                    'super_admin' => $query->where('is_super_admin', true),
                    'admin' => $query->where('is_admin', true)->where('is_super_admin', false),
                    'caregiver' => $query->where('is_caregiver', true),
                    'employer' => $query->where('is_employer', true),
                    default => null,
                };
            })
            ->orderByDesc('id')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Users/AdminUsers', [
            'users' => $users,
            'count' => User::count(),
            'filters' => $filters,
        ]);
    }

    public function updateRoles(Request $request, User $user)
    {
        $validated = [
            'is_admin' => $request->boolean('is_admin'),
            'is_super_admin' => $request->boolean('is_super_admin'),
            'is_caregiver' => $request->boolean('is_caregiver'),
            'is_employer' => $request->boolean('is_employer'),
        ];

        $authUser = $request->user();

        if ($user->id === $authUser->id && $user->isSuperAdmin() && ! $validated['is_super_admin']) {
            return back()->with('error', 'You cannot remove your own super admin role.');
        }

        if ($user->isSuperAdmin() && ! $validated['is_super_admin']) {
            $hasOtherSuperAdmin = User::query()
                ->where('is_super_admin', true)
                ->where('id', '!=', $user->id)
                ->exists();

            if (! $hasOtherSuperAdmin) {
                return back()->with('error', 'There must be at least one super admin.');
            }
        }

        $user->update($validated);

        return back()->with('success', 'User roles updated.');
    }
}
