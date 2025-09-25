<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SectionController extends Controller
{
    public function adminSectionManage()
    {
        $sections = Section::all();
        return Inertia::render('Admin/Blog/SectionManage', [
            'sections' => $sections,
        ]);
    }

    public function storeSection(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:sections,name',
            'icon' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('icon')) {
            $data['icon'] = $request->file('icon')->store('sections', 'public');
        }

        $section = Section::create($data);

        return redirect()->back()->with('success', 'Section created!');
    }

    public function updateSection(Request $request, Section $section)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:sections,name,' . $section->id,
            'icon' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('icon')) {
            // Delete old icon if exists
            if ($section->icon && Storage::disk('public')->exists($section->icon)) {
                Storage::disk('public')->delete($section->icon);
            }
            $data['icon'] = $request->file('icon')->store('sections', 'public');
        } else {
            unset($data['icon']);
        }

        $section->update($data);

        return redirect()->back()->with('success', 'Section updated!');
    }

    public function deleteSection(Section $section)
    {
        if ($section->icon && Storage::disk('public')->exists($section->icon)) {
            Storage::disk('public')->delete($section->icon);
        }
        $section->delete();
        return redirect()->back()->with('success', 'Section deleted!');
    }
}
