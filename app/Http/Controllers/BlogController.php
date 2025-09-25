<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogImage;
use App\Models\Section;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BlogController extends Controller
{
    // Maternal And Baby Health
    public function maternalBabyHealthCare()
    {
        return Inertia::render('Blog/MaternalAndBaby/MaternalAndBabyHealth');
    }

    public function maternalBabyHealthCareSection($section)
    {
        // Find section by slug or name
        // $sectionModel = Section::where('slug', $section)->orWhere('name', $section)->firstOrFail();

        // Get blogs for this section
        // $blogs = Blog::where('section_id', $sectionModel->id)->get();

        // Get all sections for the selector
        // $sections = Section::all();

        // return Inertia::render('Blog/MaternalAndBaby/BlogSectionPage', [
        //     'sectionName' => $sectionModel->name,
        //     'blogs' => $blogs,
        //     'sections' => $sections,
        // ]);

        // For now demo only
        return Inertia::render('Blog/MaternalAndBaby/BabyBlogSection', [
            'section' => $section
        ]);
    }

    // Show the blog page from elder health
    public function elderHealth()
    {
        return Inertia::render('Blog/ElderHealth/ElderHealth');
    }

    // Show the blog section for elder health
    public function elderHealthSection($section)
    {
            return Inertia::render('Blog/ElderHealth/ElderBlogSection', [
                'section' => $section
            ]);
    }

    // Show the blog page from first aid emergency health care
    public function emergencyHealthCare()
    {
        return Inertia::render('Blog/EmergencyHealthCare/FirstAidAndEmergencyHealth');
    }

    // Show the blog section for first aid emergency health care
    public function emergencyHealthCareSection($section)
    {
            return Inertia::render('Blog/EmergencyHealthCare/EmergencyHealthCareSection', [
                'section' => $section
            ]);
    }

    // ----------- Admin Blog Management ----------------
    public function adminIndex()
    {
        $sections = Section::all();
        $topics = Topic::all();
        // Eager load topics for each blog if needed
        $blogs = Blog::with('topics')->latest()->get();

        return Inertia::render('Admin/Blog/BlogIndex', [
            'sections' => $sections,
            'topics' => $topics,
            'blogs' => $blogs,
        ]);
    }

    public function create()
    {
        // Pass sections and topics to the page
        $sections = \App\Models\Section::all();
        $topics = \App\Models\Topic::all();
        return Inertia::render('Admin/Blog/CreateBlog', [
            'sections' => $sections,
            'topics' => $topics,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'section_id' => 'required|exists:sections,id',
            'topic_ids' => 'required|array|min:1',
            'topic_ids.*' => 'exists:topics,id',
            'header_image' => 'nullable|image|max:2048',
            'content' => 'required',
            'blog_images.*' => 'nullable|image|max:2048',
        ]);

        DB::transaction(function () use ($request, $validated) {
            // Save header image
            if ($request->hasFile('header_image')) {
                $validated['header_image'] = $request->file('header_image')->store('blogs', 'public');
            }

            // Create blog
            $blog = Blog::create([
                'title' => $validated['title'],
                'section_id' => $validated['section_id'],
                'header_image' => $validated['header_image'] ?? null,
                'content' => $validated['content'],
            ]);

            // Attach topics
            $blog->topics()->sync($validated['topic_ids']);

            // Save blog images
            if ($request->hasFile('blog_images')) {
                foreach ($request->file('blog_images') as $idx => $img) {
                    $path = $img->store('blogs', 'public');
                    BlogImage::create([
                        'blog_id' => $blog->id,
                        'image_path' => $path,
                        'position' => $idx + 1,
                    ]);
                }
            }
        });

        return redirect()->route('admin.blogs.index')->with('success', 'Blog created!');
    }

    public function edit($id)
    {
        $blog = Blog::with(['topics', 'images'])->findOrFail($id);
        $sections = Section::all();
        $topics = Topic::all();

        return Inertia::render('Admin/Blog/EditBlog', [
            'blog' => $blog,
            'sections' => $sections,
            'topics' => $topics,
        ]);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::with('images')->findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'section_id' => 'required|exists:sections,id',
            'topic_ids' => 'required|array|min:1',
            'topic_ids.*' => 'exists:topics,id',
            'header_image' => 'nullable|image|max:2048',
            'content' => 'required',
            'blog_images.*' => 'nullable|image|max:2048',
            'delete_blog_image_ids' => 'array',
            'delete_blog_image_ids.*' => 'integer|exists:blog_images,id',
        ]);

        DB::transaction(function () use ($request, $validated, $blog) {
            // Handle header image update
            if ($request->hasFile('header_image')) {
                // Delete old header image if exists
                if ($blog->header_image && Storage::disk('public')->exists($blog->header_image)) {
                    Storage::disk('public')->delete($blog->header_image);
                }
                $validated['header_image'] = $request->file('header_image')->store('blogs', 'public');
            } else {
                unset($validated['header_image']);
            }

            // Update blog
            $blog->update([
                'title' => $validated['title'],
                'section_id' => $validated['section_id'],
                'header_image' => $validated['header_image'] ?? $blog->header_image,
                'content' => $validated['content'],
            ]);

            // Sync topics
            $blog->topics()->sync($validated['topic_ids']);

            // Delete selected blog images
            if (!empty($validated['delete_blog_image_ids'])) {
                $imagesToDelete = BlogImage::whereIn('id', $validated['delete_blog_image_ids'])->get();
                foreach ($imagesToDelete as $img) {
                    if ($img->image_path && Storage::disk('public')->exists($img->image_path)) {
                        Storage::disk('public')->delete($img->image_path);
                    }
                    $img->delete();
                }
            }

            // Add new blog images
            if ($request->hasFile('blog_images')) {
                $lastPosition = $blog->images()->max('position') ?? 0;
                foreach ($request->file('blog_images') as $idx => $img) {
                    $path = $img->store('blogs', 'public');
                    BlogImage::create([
                        'blog_id' => $blog->id,
                        'image_path' => $path,
                        'position' => $lastPosition + $idx + 1,
                    ]);
                }
            }
        });

        return redirect()->route('admin.blogs.index')->with('success', 'Blog updated!');
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
    public function showSingleBlog($slug)
    {
        return Inertia::render('Blog/SingleBlog');
    }

   
    // Show the blog page from elder health -> elder caregiving skills
    public function elderCaregivingKnowledge()
    {
        return Inertia::render('Blog/ElderCaregivingKnowledge');
    }

    
}
