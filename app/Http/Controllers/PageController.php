<?php

namespace App\Http\Controllers;

use App\Models\CV;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
   public function index ()
   {
      $caregivers = CV::where('is_approved', true)
      ->inRandomOrder()
      ->take(6)
      ->get();

      return Inertia::render('Home', [
         'caregivers' => $caregivers,
      ]);
   }

   public function sevenDaysTraining()
   {
      return back()->with('success', 'Coming Soon ...');
   }
}
