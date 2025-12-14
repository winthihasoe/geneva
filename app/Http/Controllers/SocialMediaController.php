<?php

namespace App\Http\Controllers;

use App\Models\SocialMedia;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SocialMediaController extends Controller
{
    // Index all social media records
    public function index()
    {
        $socialMedias = SocialMedia::all();
        return Inertia::render('Admin/Social/SocialMediaManagement', [
            'socialMedias' => $socialMedias,
        ]);
    }

    // Store a new social media record
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'icon'        => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
            'url'         => 'nullable|string',
            'line_id'     => 'nullable|string|max:255',
        ]);

        SocialMedia::create($validated);
        
        // Clear cache when new social media is added
        cache()->forget('social_media_links');
        
        return redirect()->back()->with('success', 'Social media added successfully.');
    }

    // Update an existing social media record
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'icon'        => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
            'url'         => 'nullable|string',
            'line_id'     => 'nullable|string|max:255',
        ]);

        $socialMedia = SocialMedia::findOrFail($id);
        $socialMedia->update($validated);
        // If links are updated, clear the cache
        cache()->forget('social_media_links');

        return redirect()->back()->with('success', 'Social media updated successfully.');
    }

    // Delete a social media record
    public function destroy($id)
    {
        $socialMedia = SocialMedia::findOrFail($id);
        $socialMedia->delete();

        // Clear cache when social media is deleted
        cache()->forget('social_media_links');

        return redirect()->back()->with('success', 'Social media deleted successfully.');
    }
}
