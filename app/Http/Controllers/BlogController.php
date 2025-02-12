<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    // Show the blog page from elder health
    public function elderHealth()
    {
        return Inertia::render('Blog/ElderHealth');
    }
   
    // Show the blog page from elder health -> elder caregiving skills
    public function elderCaregivingSkills()
    {
        return Inertia::render('Blog/ElderCaregivingSkills');
    }
    
    // Show the blog page from elder health -> elder health blogs
    public function elderHealthBlogs()
    {
        return Inertia::render('Blog/ElderHealthBlogs');
    }
    
    // Show the blog page from elder health -> elder health blogs -> heart health
    public function heartHealth()
    {
        return Inertia::render('Blog/ElderHealthBlogs/HeartHealth');
    }
 
    // Show the blog page from elder health -> elder health blogs -> liver health
    public function liverHealth()
    {
        return Inertia::render('Blog/ElderHealthBlogs/LiverHealth');
    }
    
    // Show the blog page from elder health -> elder health blogs -> kidney health
    public function kidneyHealth()
    {
        return Inertia::render('Blog/ElderHealthBlogs/KidneyHealth');
    }
    
    // Show the blog page from elder health -> elder health blogs -> lungs health
    public function lungsHealth()
    {
        return Inertia::render('Blog/ElderHealthBlogs/LungsHealth');
    }
    
    // Show the blog page from elder health -> elder health blogs -> bone health
    public function boneHealth()
    {
        return Inertia::render('Blog/ElderHealthBlogs/BoneHealth');
    }
    
    // Show the blog page from elder health -> elder health blogs -> digestive health
    public function digestive()
    {
        return Inertia::render('Blog/ElderHealthBlogs/DigestiveHealth');
    }
    
    // Show the blog page from elder health -> elder health blogs -> brain health
    public function brain()
    {
        return Inertia::render('Blog/ElderHealthBlogs/BrainHealth');
    }
    // Show the blog page from elder health -> elder health blogs -> eye health
    public function eyeHealth()
    {
        return Inertia::render('Blog/ElderHealthBlogs/EyeHealth');
    }
    
    // Show the blog page from elder health -> elder health blogs -> diabetes health
    public function diabetes()
    {
        return Inertia::render('Blog/ElderHealthBlogs/Diabetes');
    }
    
    // Show the blog page from elder health -> elder health blogs -> hypertension health
    public function hypertension()
    {
        return Inertia::render('Blog/ElderHealthBlogs/Hypertension');
    }
    
    // Show the blog page from elder health -> elder health blogs -> hearing health
    public function hearing()
    {
        return Inertia::render('Blog/ElderHealthBlogs/HearingHealth');
    }
    
    // Show the blog page from elder health -> elder health blogs -> cancer health
    public function cancer()
    {
        return Inertia::render('Blog/ElderHealthBlogs/Cancer');
    }
    
    // Show the blog page from elder health -> elder health blogs -> physical Exercise health
    public function physicalExercise()
    {
        return Inertia::render('Blog/ElderHealthBlogs/PhysicalExercise');
    }
    
    // Show the blog page from elder health -> elder health blogs -> nutrition health
    public function nutrition()
    {
        return Inertia::render('Blog/ElderHealthBlogs/Nutrition');
    }
    
    // Show the blog page from elder health -> elder health blogs -> dental Health 
    public function dentalHealth()
    {
        return Inertia::render('Blog/ElderHealthBlogs/DentalHealth');
    }
    
    // Show the blog page from elder health -> elder health blogs -> drug and medication 
    public function drug()
    {
        return Inertia::render('Blog/ElderHealthBlogs/DrugMedication');
    }
    
    // Show the blog page from elder health -> elder health blogs -> drug and medication 
    public function showSingleBlog()
    {
        return Inertia::render('Blog/SingleBlog');
    }

   
    // Show the blog page from elder health -> elder caregiving skills
    public function elderCaregivingKnowledge()
    {
        return Inertia::render('Blog/ElderCaregivingKnowledge');
    }

    public function index()
    {
        return Blog::with(['section', 'topics'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'header_image' => 'nullable|string',
            'section_id' => 'required|exists:sections,id',
            'topics' => 'required|array',
            'topics.*' => 'exists:topics,id',
        ]);

        $blog = Blog::create($validated);
        $blog->topics()->attach($request->input('topics'));
        return $blog;
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'header_image' => 'nullable|string',
            'section_id' => 'required|exists:sections,id',
            'topics' => 'nullable|array',
            'topics.*' => 'exists:topics,id',
        ]);

        $blog->update($validated);
        if ($request->has('topics')) {
            $blog->topics()->sync($request->input('topics'));
        }
        return $blog;
    }

    public function destroy(Blog $blog)
    {
        $blog->delete();
        return response()->noContent();
    }
}
