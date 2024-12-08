<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NewbornBabyCareLogController extends Controller
{
    public function fillForm()
    {
        return Inertia::render('CareLog/Newborn/NewbornCareLogForm');
    }
}
