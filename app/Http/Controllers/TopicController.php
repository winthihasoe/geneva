<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    public function index()
    {
        return Topic::with('section')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'section_id' => 'required|exists:sections,id',
            'icon' => 'nullable|string',
        ]);

        return Topic::create($validated);
    }

    public function update(Request $request, Topic $topic)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'section_id' => 'required|exists:sections,id',
            'icon' => 'nullable|string',
        ]);

        $topic->update($validated);
        return $topic;
    }

    public function destroy(Topic $topic)
    {
        $topic->delete();
        return response()->noContent();
    }
}
