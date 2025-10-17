<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class HouseholdWorkRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'care_log_id',
        'household_work',
        'start_time',
        'duration',
        'notes',
    ];

    protected $casts = [
        'start_time' => 'datetime:H:i',
    ];

    // Relationships
    public function careLog()
    {
        return $this->belongsTo(CareLog::class);
    }

    // Helper method to get formatted start time
    public function getFormattedStartTime()
    {
        if ($this->start_time) {
            return $this->start_time->format('H:i');
        }
        return null;
    }

    // Helper method to calculate end time based on duration
    public function getEstimatedEndTime()
    {
        if ($this->start_time && $this->duration) {
            $durationMinutes = $this->getDurationInMinutes();
            if ($durationMinutes) {
                return $this->start_time->copy()->addMinutes($durationMinutes);
            }
        }
        return null;
    }

    // Helper method to get formatted end time
    public function getFormattedEndTime()
    {
        $endTime = $this->getEstimatedEndTime();
        return $endTime ? $endTime->format('H:i') : null;
    }

    // Helper method to parse duration into minutes
    public function getDurationInMinutes()
    {
        if (!$this->duration) {
            return null;
        }

        $duration = strtolower(trim($this->duration));
        
        // Handle various formats: "30m", "1h", "1h 30m", "90 minutes", "1.5 hours"
        if (preg_match('/(\d+(?:\.\d+)?)\s*h(?:ours?)?\s*(\d+)?\s*m(?:inutes?)?/i', $duration, $matches)) {
            // Format: "1h 30m" or "1.5h"
            $hours = floatval($matches[1]);
            $minutes = isset($matches[2]) ? intval($matches[2]) : 0;
            return ($hours * 60) + $minutes;
        } elseif (preg_match('/(\d+(?:\.\d+)?)\s*h(?:ours?)?/i', $duration, $matches)) {
            // Format: "1h" or "1.5 hours"
            return floatval($matches[1]) * 60;
        } elseif (preg_match('/(\d+)\s*m(?:inutes?)?/i', $duration, $matches)) {
            // Format: "30m" or "30 minutes"
            return intval($matches[1]);
        } elseif (is_numeric($duration)) {
            // Assume pure number is minutes
            return intval($duration);
        }
        
        return null;
    }

    // Helper method to get standardized duration format
    public function getStandardizedDuration()
    {
        $minutes = $this->getDurationInMinutes();
        
        if (!$minutes) {
            return $this->duration; // Return original if can't parse
        }
        
        if ($minutes >= 60) {
            $hours = floor($minutes / 60);
            $remainingMinutes = $minutes % 60;
            
            if ($remainingMinutes > 0) {
                return $hours . 'h ' . $remainingMinutes . 'm';
            } else {
                return $hours . 'h';
            }
        } else {
            return $minutes . 'm';
        }
    }

    // Check if work is currently in progress (based on time)
    public function isInProgress()
    {
        if (!$this->start_time) {
            return false;
        }
        
        $now = now();
        $startTime = $this->start_time;
        $endTime = $this->getEstimatedEndTime();
        
        // If we have an end time, check if current time is between start and end
        if ($endTime) {
            return $now->between($startTime, $endTime);
        }
        
        // If no duration specified, assume it's in progress if started today and within reasonable hours
        return $startTime->isToday() && $now->greaterThan($startTime) && $now->diffInHours($startTime) < 8;
    }

    // Check if work is completed
    public function isCompleted()
    {
        if (!$this->start_time || !$this->duration) {
            return false;
        }
        
        $endTime = $this->getEstimatedEndTime();
        return $endTime && now()->greaterThan($endTime);
    }

    // Get work status
    public function getWorkStatus()
    {
        if ($this->isInProgress()) {
            return 'in_progress';
        } elseif ($this->isCompleted()) {
            return 'completed';
        } elseif ($this->start_time && $this->start_time->isFuture()) {
            return 'scheduled';
        } else {
            return 'pending';
        }
    }

    // Get work category (basic categorization)
    public function getWorkCategory()
    {
        $work = strtolower($this->household_work ?? '');
        
        if (str_contains($work, 'clean') || str_contains($work, 'vacuum') || str_contains($work, 'dust') || str_contains($work, 'mop')) {
            return 'cleaning';
        } elseif (str_contains($work, 'cook') || str_contains($work, 'meal') || str_contains($work, 'kitchen') || str_contains($work, 'dish')) {
            return 'cooking';
        } elseif (str_contains($work, 'laundry') || str_contains($work, 'wash') || str_contains($work, 'fold') || str_contains($work, 'iron')) {
            return 'laundry';
        } elseif (str_contains($work, 'garden') || str_contains($work, 'plant') || str_contains($work, 'water')) {
            return 'gardening';
        } elseif (str_contains($work, 'shop') || str_contains($work, 'grocery') || str_contains($work, 'errand')) {
            return 'shopping';
        } else {
            return 'general';
        }
    }

    // Get work difficulty level (based on duration)
    public function getWorkDifficulty()
    {
        $minutes = $this->getDurationInMinutes();
        
        if (!$minutes) {
            return 'unknown';
        }
        
        if ($minutes <= 30) {
            return 'light';      // 30 minutes or less
        } elseif ($minutes <= 120) {
            return 'moderate';   // 30 minutes to 2 hours
        } else {
            return 'heavy';      // More than 2 hours
        }
    }

    // Scope for work records ordered by time
    public function scopeOrderedByTime($query, $careLogId = null)
    {
        $q = $query->orderBy('start_time');
        
        if ($careLogId) {
            $q->where('care_log_id', $careLogId);
        }
        
        return $q;
    }

    // Scope for current day's work
    public function scopeToday($query)
    {
        return $query->whereDate('start_time', today());
    }

    // Scope for work in progress
    public function scopeInProgress($query)
    {
        return $query->get()->filter(function($record) {
            return $record->isInProgress();
        });
    }

    // Scope for completed work
    public function scopeCompleted($query)
    {
        return $query->get()->filter(function($record) {
            return $record->isCompleted();
        });
    }

    // Scope for work by category
    public function scopeByCategory($query, $category)
    {
        return $query->get()->filter(function($record) use ($category) {
            return $record->getWorkCategory() === $category;
        });
    }

    // Get household work statistics for a care log
    public static function getHouseholdWorkStats($careLogId)
    {
        $records = self::where('care_log_id', $careLogId)->get();
        
        if ($records->isEmpty()) {
            return null;
        }
        
        // Calculate total time spent
        $totalMinutes = $records->sum(function($record) {
            return $record->getDurationInMinutes() ?? 0;
        });
        
        // Group by category
        $categoryBreakdown = $records->groupBy(function($record) {
            return $record->getWorkCategory();
        });
        
        // Group by difficulty
        $difficultyBreakdown = $records->groupBy(function($record) {
            return $record->getWorkDifficulty();
        });
        
        // Group by status
        $statusBreakdown = $records->groupBy(function($record) {
            return $record->getWorkStatus();
        });
        
        return [
            'total_tasks' => $records->count(),
            'total_time_minutes' => $totalMinutes,
            'total_time_formatted' => self::formatMinutes($totalMinutes),
            'average_task_duration' => $records->count() > 0 ? round($totalMinutes / $records->count()) : 0,
            'category_breakdown' => $categoryBreakdown->map(function($tasks, $category) {
                return [
                    'category' => $category,
                    'count' => $tasks->count(),
                    'total_minutes' => $tasks->sum(fn($t) => $t->getDurationInMinutes() ?? 0),
                ];
            }),
            'difficulty_breakdown' => $difficultyBreakdown->map(function($tasks, $difficulty) {
                return [
                    'difficulty' => $difficulty,
                    'count' => $tasks->count(),
                ];
            }),
            'status_breakdown' => $statusBreakdown->map(function($tasks, $status) {
                return [
                    'status' => $status,
                    'count' => $tasks->count(),
                ];
            }),
            'completion_rate' => $records->count() > 0 ? 
                round(($records->filter(fn($r) => $r->isCompleted())->count() / $records->count()) * 100, 1) : 0,
        ];
    }

    // Get today's household work summary
    public static function getTodaysWorkSummary($careLogId = null)
    {
        $query = self::today();
        
        if ($careLogId) {
            $query->where('care_log_id', $careLogId);
        }
        
        $records = $query->get();
        
        if ($records->isEmpty()) {
            return null;
        }
        
        return [
            'total_tasks_today' => $records->count(),
            'completed_tasks' => $records->filter(fn($r) => $r->isCompleted())->count(),
            'in_progress_tasks' => $records->filter(fn($r) => $r->isInProgress())->count(),
            'pending_tasks' => $records->filter(fn($r) => $r->getWorkStatus() === 'pending')->count(),
            'total_time_today' => $records->sum(fn($r) => $r->getDurationInMinutes() ?? 0),
            'upcoming_tasks' => $records->filter(function($record) {
                return $record->start_time && $record->start_time->isFuture();
            })->sortBy('start_time')->values(),
        ];
    }

    // Get work productivity metrics
    public static function getProductivityMetrics($careLogId, $days = 7)
    {
        $records = self::where('care_log_id', $careLogId)
                      ->where('start_time', '>=', now()->subDays($days))
                      ->get();
        
        if ($records->isEmpty()) {
            return null;
        }
        
        $dailyBreakdown = $records->groupBy(function($record) {
            return $record->start_time ? $record->start_time->format('Y-m-d') : 'unknown';
        });
        
        return [
            'period_days' => $days,
            'total_tasks' => $records->count(),
            'average_tasks_per_day' => round($records->count() / $days, 1),
            'total_work_hours' => round($records->sum(fn($r) => $r->getDurationInMinutes() ?? 0) / 60, 1),
            'average_hours_per_day' => round(($records->sum(fn($r) => $r->getDurationInMinutes() ?? 0) / 60) / $days, 1),
            'daily_breakdown' => $dailyBreakdown->map(function($tasks, $date) {
                return [
                    'date' => $date,
                    'task_count' => $tasks->count(),
                    'total_minutes' => $tasks->sum(fn($t) => $t->getDurationInMinutes() ?? 0),
                ];
            })->sortBy('date')->values(),
            'most_common_category' => $records->groupBy(fn($r) => $r->getWorkCategory())
                                            ->sortByDesc(fn($tasks) => $tasks->count())
                                            ->keys()
                                            ->first(),
        ];
    }

    // Helper to format minutes to hours and minutes
    private static function formatMinutes($minutes)
    {
        if ($minutes >= 60) {
            $hours = floor($minutes / 60);
            $mins = $minutes % 60;
            
            if ($mins > 0) {
                return $hours . 'h ' . $mins . 'm';
            } else {
                return $hours . 'h';
            }
        } else {
            return $minutes . 'm';
        }
    }

    // Get work record summary for reporting
    public function getWorkSummary()
    {
        return [
            'work_id' => $this->id,
            'household_work' => $this->household_work,
            'category' => $this->getWorkCategory(),
            'difficulty' => $this->getWorkDifficulty(),
            'start_time' => $this->getFormattedStartTime(),
            'end_time' => $this->getFormattedEndTime(),
            'duration' => $this->getStandardizedDuration(),
            'duration_minutes' => $this->getDurationInMinutes(),
            'status' => $this->getWorkStatus(),
            'is_in_progress' => $this->isInProgress(),
            'is_completed' => $this->isCompleted(),
            'notes' => $this->notes,
        ];
    }
}
