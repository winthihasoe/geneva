<?php

namespace App\Http\Controllers;

use App\Models\CV;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
   public function index ()
   {
      return Inertia::render('Home', [
         'caregivers' => CV::get(),
      ]);
   }

   public function sevenDaysTraining()
   {
      return back()->with('success', 'Coming Soon ...');
   }
}
