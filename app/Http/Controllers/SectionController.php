<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function index()
    {
        return Section::with('topics')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:sections|max:255',
            'icon' => 'nullable|string',
        ]);

        return Section::create($validated);
    }

    public function update(Request $request, Section $section)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:sections,name,' . $section->id,
            'icon' => 'nullable|string',
        ]);

        $section->update($validated);
        return $section;
    }

    public function destroy(Section $section)
    {
        $section->delete();
        return response()->noContent();
    }
}
