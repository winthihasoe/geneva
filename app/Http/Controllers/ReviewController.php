<?php

namespace App\Http\Controllers;

use App\Models\CV;
use App\Models\DiscountCard;
use App\Models\Patient;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ReviewController extends Controller
{
    public function show($patientSlug, $caregiverSlug)
    {
        $patient = Patient::where('slug', $patientSlug)->firstOrFail();
        $caregiver = CV::where('slug', $caregiverSlug)->firstOrFail();
        
        // Check if already reviewed
        $existingReview = Review::where('patient_id', $patient->id)
            ->where('cv_id', $caregiver->id)
            ->first();
        
        return Inertia::render('Review/ReviewForm', [
            'patient' => $patient,
            'caregiver' => $caregiver,
            'existingReview' => $existingReview,
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'cv_id' => 'required|exists:c_v_s,id',
            'rating' => 'required|integer|min:1|max:5',
            'tags' => 'nullable|array',
            'tags.*' => 'string',
            'comment' => 'nullable|string|max:1000',
        ]);
        
        $review =Review::updateOrCreate(
            [
                'patient_id' => $validated['patient_id'],
                'cv_id' => $validated['cv_id'],
            ],
            [
                'rating' => $validated['rating'],
                'tags' => $validated['tags'] ?? [],
                'comment' => $validated['comment'],
            ]
        );

        // Check if patient has an unused discount card
        $hasUnusedCard = DiscountCard::where('patient_id', $validated['patient_id'])
            ->where('is_used', false)
            ->first();
        
        // Generate new discount card only if no unused card exists
        if (!$hasUnusedCard) {
            // Generate card number: 3 random digits + MM + YY (7 digits total)
            $randomDigits = str_pad(rand(0, 999), 3, '0', STR_PAD_LEFT);
            $month = now()->format('m');
            $year = now()->format('y');
            $cardNo = $randomDigits . $month . $year;
            
            $discountCard = DiscountCard::create([
                'card_no' => $cardNo,
                'patient_id' => $validated['patient_id'],
                'review_id' => $review->id,
                'discount_percentage' => 5,
                'issued_for' => 'Reviewing a caregiver',
                'issued_by' => 'System',
                'expires_at' => now()->addMonths(2),
            ]);
        } else {
            $discountCard = $hasUnusedCard;
        }
        
        return redirect()->route('review.success', ['cardNo' => $discountCard->card_no]);
    }

    public function reviewSuccess($cardNo)
    {
        $discountCard = DiscountCard::where('card_no', $cardNo)->firstOrFail();
        
        return Inertia::render('Review/SuccessReview', [
            'discountCard' => $discountCard,
        ]);
    }

    // Admin view for all reviews
    public function adminReviews(Request $request)
    {
        $query = Review::with(['patient:id,first_name,last_name', 'cv:id,full_name'])
            ->orderBy('created_at', 'desc');
        
        // Search by patient name
        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('patient', function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                ->orWhere('last_name', 'like', "%{$search}%");
            });
        }
        
        // Filter by rating
        if ($request->filled('rating')) {
            $query->where('rating', $request->rating);
        }
        
        // Filter by status (if you have a status column)
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        
        $reviews = $query->paginate(20)->withQueryString();
        
        return Inertia::render('Review/AdminReviews', [
            'reviews' => $reviews,
            'filters' => $request->only(['search', 'rating', 'status']),
        ]);
    }
}
