<?php

namespace App\Http\Controllers;

use App\Models\TrainingCourse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TrainingCourseController extends Controller
{
    /**
     * Apply middleware protection to admin functions
     */
    public function __construct()
    {
        // Protect admin functions, leave public ones open
        $this->middleware(['auth', 'is.admin'])->except([
            'index',     // Public course listing
            'show',      // Public course details  
            'featured'   // API for featured courses
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = TrainingCourse::query();

        // Apply filters
        if ($request->filled('category')) {
            $query->byCategory($request->category);
        }

        if ($request->filled('level')) {
            $query->byLevel($request->level);
        }

        if ($request->filled('featured')) {
            $query->featured();
        }

        if ($request->filled('active')) {
            $query->active();
        }

        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%')
                  ->orWhere('instructor', 'like', '%' . $request->search . '%');
            });
        }

        $courses = $query->orderBy('order')
                        ->orderBy('created_at', 'desc')
                        ->paginate(12)
                        ->withQueryString();

        return Inertia::render('TrainingCourses/Index', [
            'courses' => $courses,
            'filters' => $request->only(['category', 'level', 'featured', 'active', 'search']),
            'categories' => TrainingCourse::distinct()->pluck('category')->filter(),
            'levels' => TrainingCourse::distinct()->pluck('level')->filter(),
        ]);
    }

    /**
     * Display admin training courses listing
     */
    public function adminIndex(Request $request)
    {
        $query = TrainingCourse::query();

        // Apply filters for admin view
        if ($request->filled('category')) {
            $query->byCategory($request->category);
        }

        if ($request->filled('level')) {
            $query->byLevel($request->level);
        }

        if ($request->filled('status')) {
            if ($request->status === 'active') {
                $query->where('is_active', true);
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        if ($request->filled('featured')) {
            if ($request->featured === 'yes') {
                $query->where('is_featured', true);
            } elseif ($request->featured === 'no') {
                $query->where('is_featured', false);
            }
        }

        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                ->orWhere('description', 'like', '%' . $request->search . '%')
                ->orWhere('instructor', 'like', '%' . $request->search . '%')
                ->orWhere('category', 'like', '%' . $request->search . '%');
            });
        }

        $courses = $query->orderBy('order')
                        ->orderBy('created_at', 'desc')
                        ->paginate(12)
                        ->withQueryString();

        return Inertia::render('Admin/TrainingCourse/AdminTrainingCourses', [
            'courses' => $courses,
            'filters' => $request->only(['category', 'level', 'status', 'featured', 'search']),
            'categories' => TrainingCourse::distinct()->pluck('category')->filter(),
            'levels' => TrainingCourse::distinct()->pluck('level')->filter(),
            'totalCourses' => TrainingCourse::count(),
            'activeCourses' => TrainingCourse::where('is_active', true)->count(),
            'featuredCourses' => TrainingCourse::where('is_featured', true)->count(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/TrainingCourse/AdminCreateTrainingCourse', [
            'categories' => TrainingCourse::distinct()->pluck('category')->filter()->values(),
            'levels' => ['Beginner', 'Intermediate', 'Advanced'],
            'languages' => ['English', 'Thai', 'Myanmar', 'Filipino', 'Indonesian'],
            'daysOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255|unique:training_courses,title',
            'description' => 'nullable|string',
            'instructor' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:100',
            'price' => 'nullable|integer|min:0',
            'duration' => 'nullable|integer|min:1',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'start_date' => 'nullable|date|after_or_equal:today',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'daily_start_time' => 'nullable|date_format:H:i',
            'daily_end_time' => 'nullable|date_format:H:i|after:daily_start_time',
            'schedule_days' => 'nullable|array',
            'schedule_days.*' => 'string|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'video_url' => 'nullable|url',
            'level' => 'nullable|string|in:Beginner,Intermediate,Advanced',
            'language' => 'nullable|string|max:50',
            'certificate_url' => 'nullable|url',
            'order' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $data = $validator->validated();

        // Handle image upload
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('training-courses', 'public');
        }

        // Generate slug if not provided
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        // Set default values
        $data['enrollment_count'] = 0;
        $data['language'] = $data['language'] ?? 'English';

        $course = TrainingCourse::create($data);

        return redirect()->route('training-courses.show', $course->slug)
                        ->with('success', 'Training course created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $course = TrainingCourse::where('slug', $slug)->firstOrFail();

        // Get related courses (same category, different course)
        $relatedCourses = TrainingCourse::active()
                                      ->where('category', $course->category)
                                      ->where('id', '!=', $course->id)
                                      ->limit(3)
                                      ->get();

        return Inertia::render('Admin/TrainingCourse/AdminSingleTrainingCourse', [
            'course' => $course,
            'relatedCourses' => $relatedCourses,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($slug)
    {
        $course = TrainingCourse::where('slug', $slug)->firstOrFail();

        return Inertia::render('Admin/TrainingCourse/AdminEditTrainingCourse', [
            'course' => $course,
            'categories' => TrainingCourse::distinct()->pluck('category')->filter(),
            'levels' => ['Beginner', 'Intermediate', 'Advanced'],
            'languages' => ['English', 'Thai', 'Myanmar', 'Filipino', 'Indonesian'],
            'daysOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $slug)
    {
        $course = TrainingCourse::where('slug', $slug)->firstOrFail();

        // Handle schedule_days if it comes as JSON string
        $requestData = $request->all();
        if (isset($requestData['schedule_days']) && is_string($requestData['schedule_days'])) {
            $requestData['schedule_days'] = json_decode($requestData['schedule_days'], true) ?: [];
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255|unique:training_courses,title,' . $course->id,
            'description' => 'nullable|string',
            'instructor' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:100',
            'price' => 'nullable|integer|min:0',
            'duration' => 'nullable|integer|min:1',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'daily_start_time' => 'nullable|date_format:H:i',
            'daily_end_time' => 'nullable|date_format:H:i|after:daily_start_time',
            'schedule_days' => 'nullable|array',
            'schedule_days.*' => 'string|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'video_url' => 'nullable|url',
            'level' => 'nullable|string|in:Beginner,Intermediate,Advanced',
            'language' => 'nullable|string|max:50',
            'certificate_url' => 'nullable|url',
            'order' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $data = $validator->validated();

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($course->image) {
                Storage::disk('public')->delete($course->image);
            }
            $data['image'] = $request->file('image')->store('training-courses', 'public');
        } else {
            // Preserve existing image by removing image from update data
            unset($data['image']);
        }

        // Update slug if title changed
        if ($course->title !== $data['title']) {
            $data['slug'] = Str::slug($data['title']);
        }

        $course->update($data);

        return redirect()->route('training-courses.show', $course->slug)
                        ->with('success', 'Training course updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($slug)
    {
        $course = TrainingCourse::where('slug', $slug)->firstOrFail();

        // Delete image if exists
        if ($course->image) {
            Storage::disk('public')->delete($course->image);
        }

        $course->delete();

        return redirect()->route('admin.training-courses.index')
                        ->with('success', 'Training course deleted successfully!');
    }

    /**
     * Toggle course active status
     */
    public function toggleActive($slug)
    {
        $course = TrainingCourse::where('slug', $slug)->firstOrFail();
        $course->update(['is_active' => !$course->is_active]);

        $status = $course->is_active ? 'activated' : 'deactivated';
        
        return back()->with('success', "Course has been {$status} successfully!");
    }

    /**
     * Toggle course featured status
     */
    public function toggleFeatured($slug)
    {
        $course = TrainingCourse::where('slug', $slug)->firstOrFail();
        $course->update(['is_featured' => !$course->is_featured]);

        $status = $course->is_featured ? 'marked as featured' : 'removed from featured';
        
        return back()->with('success', "Course has been {$status} successfully!");
    }

    /**
     * Get featured courses (for homepage, etc.)
     */
    public function featured()
    {
        $courses = TrainingCourse::featured()
                                ->active()
                                ->orderBy('order')
                                ->orderBy('created_at', 'desc')
                                ->limit(6)
                                ->get();

        return response()->json($courses);
    }

    /**
     * Duplicate a course
     */
    public function duplicate($slug)
    {
        $originalCourse = TrainingCourse::where('slug', $slug)->firstOrFail();
        
        $newCourse = $originalCourse->replicate();
        $newCourse->title = $originalCourse->title . ' (Copy)';
        $newCourse->slug = Str::slug($newCourse->title);
        $newCourse->is_featured = false;
        $newCourse->enrollment_count = 0;
        
        // Handle image duplication
        if ($originalCourse->image) {
            $originalImagePath = $originalCourse->image;
            $fileExtension = pathinfo($originalImagePath, PATHINFO_EXTENSION);
            $fileName = pathinfo($originalImagePath, PATHINFO_FILENAME);
            
            // Create a new unique filename
            $newFileName = $fileName . '_copy_' . time() . '.' . $fileExtension;
            $newImagePath = 'training-courses/' . $newFileName;
            
            // Copy the physical file in storage
            if (Storage::disk('public')->exists($originalImagePath)) {
                Storage::disk('public')->copy($originalImagePath, $newImagePath);
                $newCourse->image = $newImagePath;
            } else {
                // If original image file doesn't exist, don't set image for duplicate
                $newCourse->image = null;
            }
        }
        
        $newCourse->save();

        return redirect()->route('training-courses.edit', $newCourse->slug)
                        ->with('success', 'Course duplicated successfully! Please review and update the details.');
    }

    /**
     * Bulk actions
     */
    public function bulkAction(Request $request)
    {
        $request->validate([
            'action' => 'required|in:activate,deactivate,delete,feature,unfeature',
            'course_ids' => 'required|array',
            'course_ids.*' => 'exists:training_courses,id'
        ]);

        $courses = TrainingCourse::whereIn('id', $request->course_ids);

        switch ($request->action) {
            case 'activate':
                $courses->update(['is_active' => true]);
                $message = 'Selected courses have been activated.';
                break;
            case 'deactivate':
                $courses->update(['is_active' => false]);
                $message = 'Selected courses have been deactivated.';
                break;
            case 'feature':
                $courses->update(['is_featured' => true]);
                $message = 'Selected courses have been featured.';
                break;
            case 'unfeature':
                $courses->update(['is_featured' => false]);
                $message = 'Selected courses have been removed from featured.';
                break;
            case 'delete':
                // Delete images
                foreach ($courses->get() as $course) {
                    if ($course->image) {
                        Storage::disk('public')->delete($course->image);
                    }
                }
                $courses->delete();
                $message = 'Selected courses have been deleted.';
                break;
        }

        return back()->with('success', $message);
    }

    /**
     * Reorder courses
     */
    public function reorder(Request $request)
    {
        $request->validate([
            'courses' => 'required|array',
            'courses.*.id' => 'required|exists:training_courses,id',
            'courses.*.order' => 'required|integer|min:0'
        ]);

        foreach ($request->courses as $courseData) {
            TrainingCourse::where('id', $courseData['id'])
                         ->update(['order' => $courseData['order']]);
        }

        return back()->with('success', 'Course order updated successfully!');
    }
}
