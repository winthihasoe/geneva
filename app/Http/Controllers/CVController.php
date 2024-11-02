<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CVController extends Controller
{
    public function createCV()
    {
        return Inertia::render('CV/CreateCV');
    }
}
