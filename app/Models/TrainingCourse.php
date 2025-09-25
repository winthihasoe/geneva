<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TrainingCourse extends Model
{
    use HasFactory;

    protected $fillable = [
        'order',
        'title',
        'description',
        'instructor',
        'category',
        'price',
        'duration',
        'is_featured',
        'is_active',
        'start_date',
        'end_date',
        'daily_start_time',
        'daily_end_time',
        'schedule_days',
        'slug',
        'image',
        'video_url',
        'level',
        'language',
        'enrollment_count',
        'certificate_url',
    ];

    protected $casts = [
        'order' => 'integer',
        'price' => 'integer',
        'duration' => 'integer',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
        'daily_start_time' => 'datetime:H:i',
        'daily_end_time' => 'datetime:H:i',
        'schedule_days' => 'array',
        'enrollment_count' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Auto-generate slug when creating
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($course) {
            if (empty($course->slug)) {
                $course->slug = Str::slug($course->title);
            }
        });

        static::updating(function ($course) {
            if ($course->isDirty('title') && empty($course->slug)) {
                $course->slug = Str::slug($course->title);
            }
        });
    }

    // Scope for active courses
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope for featured courses
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    // Scope for courses by category
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    // Scope for courses by level
    public function scopeByLevel($query, $level)
    {
        return $query->where('level', $level);
    }

    // Accessor for formatted duration
    public function getFormattedDurationAttribute()
    {
        if (!$this->duration) return null;
        
        $hours = floor($this->duration / 60);
        $minutes = $this->duration % 60;
        
        if ($hours > 0 && $minutes > 0) {
            return "{$hours}h {$minutes}m";
        } elseif ($hours > 0) {
            return "{$hours}h";
        } else {
            return "{$minutes}m";
        }
    }

    // Accessor for schedule display
    public function getScheduleDisplayAttribute()
    {
        if (!$this->schedule_days || !$this->daily_start_time || !$this->daily_end_time) {
            return null;
        }

        $days = implode(', ', $this->schedule_days);
        $startTime = \Carbon\Carbon::parse($this->daily_start_time)->format('H:i');
        $endTime = \Carbon\Carbon::parse($this->daily_end_time)->format('H:i');
        
        return "{$days} ({$startTime} - {$endTime})";
    }

    // Check if course is currently running
    public function getIsRunningAttribute()
    {
        $now = now()->toDateString();
        return $this->start_date <= $now && $this->end_date >= $now;
    }

    // Check if course is upcoming
    public function getIsUpcomingAttribute()
    {
        return $this->start_date > now()->toDateString();
    }

    // Check if course is completed
    public function getIsCompletedAttribute()
    {
        return $this->end_date < now()->toDateString();
    }
}
