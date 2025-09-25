<?php

namespace App\Http\Controllers;

use App\Models\Section;
use App\Models\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopicController extends Controller
{
    public function adminManage()
    {
        $topics = \App\Models\Topic::with('section')->get();
        $sections = Section::all();
        return Inertia::render('Admin/Blog/TopicManage', [
            'topics' => $topics,
            'sections' => $sections,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'section_id' => 'required|exists:sections,id',
            'icon' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('icon')) {
            $validated['icon'] = $request->file('icon')->store('topics', 'public');
        }

        \App\Models\Topic::create($validated);

        return redirect()->back()->with('success', 'Topic created!');
    }

    public function update(Request $request, Topic $topic)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'section_id' => 'required|exists:sections,id',
            'icon' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('icon')) {
            // Delete old icon if exists
            if ($topic->icon && Storage::disk('public')->exists($topic->icon)) {
                Storage::disk('public')->delete($topic->icon);
            }
            $validated['icon'] = $request->file('icon')->store('topics', 'public');
        } else {
            unset($validated['icon']);
        }

        $topic->update($validated);
        return redirect()->back()->with('success', 'Topic updated!');
    }

    public function destroy(Topic $topic)
    {
        $topic->delete();
        return redirect()->back()->with('success', 'Topic deleted!');
    }
}
