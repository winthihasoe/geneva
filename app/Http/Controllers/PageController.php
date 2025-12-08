<?php

namespace App\Http\Controllers;

use App\Models\CV;
use App\Models\TrainingCourse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
   public function index ()
   {
      $caregivers = CV::whereNotIn('status', ['Leave', 'Resigned', 'Blacklisted'])
      ->inRandomOrder()
      ->take(24)
      ->select('id','full_name', 'newborn_care_level','nanny_care_level', 'level', 'date_of_birth', 'nationality', 'geneva_id', 'profile_photo', 'status', 'services')
      ->get();

     // Fetch 2 featured training courses
      $courses = TrainingCourse::where('is_featured', true)
         ->where('is_active', true)
         ->orderBy('order')
         ->orderBy('created_at', 'desc')
         ->take(2)
         ->select('id', 'title', 'description', 'instructor', 'category', 'price', 'duration', 'image', 'slug', 'level', 'language')
         ->get();

      return Inertia::render('Home', [
         'caregivers' => $caregivers,
         'courses' => $courses,
      ]);
   }

   public function sevenDaysTraining()
   {
      return back()->with('success', 'Coming Soon ...');
   }
   
   public function medicalCheckup()
   {
      return back()->with('success', 'Coming Soon ...');
   }
  
   public function mission()
   {
      return Inertia::render('AboutUs/Mission');
   }
   
   public function team()
   {
      return Inertia::render('AboutUs/Team');
   }
   
   public function philosophy()
   {
      return Inertia::render('AboutUs/Philosophy');
   }
   
   public function contactInfo()
   {
      return Inertia::render('Contact/ContactInfo');
   }
  
   public function customerService()
   {
      return Inertia::render('Contact/CustomerService');
   }
  
   public function privacyPolicy()
   {
      return Inertia::render('PrivacyPolicy');
   }

  

   public function trainingCenter() {
      return Inertia::render('ComingSoon');
   }

   // How it works
   public function howItWorks()
   {
      return Inertia::render('HowItWorks');
   }

   // Coming Soon --- IGNORE ---
   public function comingSoon()
   {
      return Inertia::render('ComingSoon');
   }
}
