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
      ->select('nickname', 'newborn_care_level','nanny_care_level', 'level', 'date_of_birth', 'nationality', 'ha_id', 'newborn_experience_years', 'nanny_experience_years', 'elder_experience_years', 'profile_photo')
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
