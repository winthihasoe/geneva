<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class IsEmployer
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the authenticated user is a caregiver
        if (Auth::check() && Auth::user()->is_employer) {
        return $next($request); // Allow the request to continue
        }

        // If the user is not a caregiver, redirect back with a message
        return redirect()->back()->with('error', 'Sorry! This is for employer only.');
    }
}
