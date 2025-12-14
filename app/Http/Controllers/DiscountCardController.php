<?php

namespace App\Http\Controllers;

use App\Models\DiscountCard;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;


class DiscountCardController extends Controller
{
    public function index(Request $request)
    {
        $query = DiscountCard::with('patient');

        // Search by card number
        if ($request->filled('card_no')) {
            $query->where('card_no', 'like', '%' . $request->card_no . '%');
        }

        // Filter by used status
        if ($request->filled('is_used')) {
            $query->where('is_used', $request->is_used === 'true');
        }

        // Filter by expiry status
        if ($request->filled('is_expired')) {
            if ($request->is_expired === 'true') {
                $query->where('expires_at', '<', now());
            } else {
                $query->where(function($q) {
                    $q->whereNull('expires_at')
                      ->orWhere('expires_at', '>=', now());
                });
            }
        }

        $discountCards = $query->orderBy('created_at', 'desc')->paginate(20);

        return Inertia::render('Admin/Discount/AdminDiscounts', [
            'discountCards' => $discountCards,
            'filters' => $request->only(['card_no', 'is_used', 'is_expired']),
            'patients' => Patient::select('id', 'first_name', 'last_name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'nullable|exists:patients,id',
            'discount_percentage' => 'required|numeric|min:1|max:100',
            'issued_for' => 'nullable|string|max:255',
            'expires_at' => 'nullable|date|after:today',
        ]);

        // Generate card number: 3 random digits + MM + YY
        $randomDigits = str_pad(rand(0, 999), 3, '0', STR_PAD_LEFT);
        $month = now()->format('m');
        $year = now()->format('y');
        $cardNo = $randomDigits . $month . $year;

        // Check if patient already has an unused card (if patient_id provided)
        if (!empty($validated['patient_id'])) {
            $existingCard = DiscountCard::where('patient_id', $validated['patient_id'])
                ->where('is_used', false)
                ->first();

            if ($existingCard) {
                return back()->with('error', 'Patient already has an unused discount card.');
            }
        }
       
        $discountCard = DiscountCard::create([
            'card_no' => $cardNo,
            'patient_id' => $validated['patient_id'] ?? null,
            'discount_percentage' => $validated['discount_percentage'],
            'issued_for' => $validated['issued_for'] ?? null,
            'issued_by' => auth()->user()->name ?? 'Admin',
            'expires_at' => $validated['expires_at'] ?? now()->addMonths(2),
        ]);

        return back()->with('success', 'Discount card created successfully!');
    }

    public function show($id)
    {
        $discountCard = DiscountCard::with('patient', 'review')->findOrFail($id);

        return response()->json($discountCard);
    }

    public function update(Request $request, $id)
    {
        $discountCard = DiscountCard::findOrFail($id);

        $validated = $request->validate([
            'patient_id' => 'nullable|exists:patients,id',
            'discount_percentage' => 'required|numeric|min:1|max:100',
            'issued_for' => 'nullable|string|max:255',
            'expires_at' => 'nullable|date',
            'is_used' => 'required|boolean',
        ]);

        // If marking as used, set used_at timestamp
        if ($validated['is_used'] && !$discountCard->is_used) {
            $validated['used_at'] = now();
        }

        // If marking as unused, clear used_at timestamp
        if (!$validated['is_used'] && $discountCard->is_used) {
            $validated['used_at'] = null;
        }

        $discountCard->update($validated);

        return back()->with('success', 'Discount card updated successfully!');
    }

    public function destroy($id)
    {
        $discountCard = DiscountCard::findOrFail($id);

        // Only allow deletion if not issued by system and not used
        if ($discountCard->issued_by === 'System') {
            return back()->with('error', 'Cannot delete system-generated discount cards.');
        }

        if ($discountCard->is_used) {
            return back()->with('error', 'Cannot delete used discount cards.');
        }

        $discountCard->delete();

        return back()->with('success', 'Discount card deleted successfully!');
    }
}
