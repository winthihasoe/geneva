<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class MobilityExercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'care_log_id',
        'exercise_time',
        'duration',
        'mobility_assistance_details',
        'notes',
    ];

    protected $casts = [
        'exercise_time' => 'datetime:H:i',
    ];

    // Relationships
    public function careLog()
    {
        return $this->belongsTo(CareLog::class);
    }

    // Helper method to get formatted exercise time
    public function getFormattedExerciseTime()
    {
        if ($this->exercise_time) {
            return $this->exercise_time->format('H:i');
        }
        return null;
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

    // Calculate estimated end time based on duration
    public function getEstimatedEndTime()
    {
        if ($this->exercise_time && $this->duration) {
            $durationMinutes = $this->getDurationInMinutes();
            if ($durationMinutes) {
                return $this->exercise_time->copy()->addMinutes($durationMinutes);
            }
        }
        return null;
    }

    // Get formatted end time
    public function getFormattedEndTime()
    {
        $endTime = $this->getEstimatedEndTime();
        return $endTime ? $endTime->format('H:i') : null;
    }

    // Check if exercise is currently in progress
    public function isInProgress()
    {
        if (!$this->exercise_time) {
            return false;
        }
        
        $now = now();
        $startTime = $this->exercise_time;
        $endTime = $this->getEstimatedEndTime();
        
        // If we have an end time, check if current time is between start and end
        if ($endTime) {
            return $now->between($startTime, $endTime);
        }
        
        // If no duration specified, assume it's in progress if started today and within reasonable hours
        return $startTime->isToday() && $now->greaterThan($startTime) && $now->diffInHours($startTime) < 4;
    }

    // Check if exercise is completed
    public function isCompleted()
    {
        if (!$this->exercise_time || !$this->duration) {
            return false;
        }
        
        $endTime = $this->getEstimatedEndTime();
        return $endTime && now()->greaterThan($endTime);
    }

    // Get exercise status
    public function getExerciseStatus()
    {
        if ($this->isInProgress()) {
            return 'in_progress';
        } elseif ($this->isCompleted()) {
            return 'completed';
        } elseif ($this->exercise_time && $this->exercise_time->isFuture()) {
            return 'scheduled';
        } else {
            return 'pending';
        }
    }

    // Get exercise intensity level (based on duration)
    public function getExerciseIntensity()
    {
        $minutes = $this->getDurationInMinutes();
        
        if (!$minutes) {
            return 'unknown';
        }
        
        if ($minutes <= 15) {
            return 'light';      // 15 minutes or less
        } elseif ($minutes <= 45) {
            return 'moderate';   // 15-45 minutes
        } else {
            return 'intensive';  // More than 45 minutes
        }
    }

    // Extract exercise types from assistance details
    public function getExerciseTypes()
    {
        if (!$this->mobility_assistance_details) {
            return [];
        }
        
        $details = strtolower($this->mobility_assistance_details);
        $exerciseTypes = [];
        
        // Common exercise keywords
        $exerciseKeywords = [
            'walking' => 'Walking',
            'stretching' => 'Stretching',
            'range of motion' => 'Range of Motion',
            'rom' => 'Range of Motion',
            'physical therapy' => 'Physical Therapy',
            'pt' => 'Physical Therapy',
            'wheelchair' => 'Wheelchair Mobility',
            'transfer' => 'Transfer Training',
            'balance' => 'Balance Training',
            'strength' => 'Strength Training',
            'resistance' => 'Resistance Exercise',
            'flexibility' => 'Flexibility',
            'coordination' => 'Coordination',
            'gait' => 'Gait Training',
            'standing' => 'Standing Exercise',
            'sitting' => 'Sitting Exercise',
            'bed' => 'Bed Mobility',
            'turning' => 'Turning/Positioning',
            'massage' => 'Therapeutic Massage',
        ];
        
        foreach ($exerciseKeywords as $keyword => $displayName) {
            if (str_contains($details, $keyword)) {
                $exerciseTypes[] = $displayName;
            }
        }
        
        return array_unique($exerciseTypes);
    }

    // Check for cooperation level from notes
    public function getCooperationLevel()
    {
        if (!$this->notes) {
            return 'unknown';
        }
        
        $notes = strtolower($this->notes);
        
        if (str_contains($notes, 'excellent cooperation') || str_contains($notes, 'very cooperative') || str_contains($notes, 'enthusiastic')) {
            return 'excellent';
        } elseif (str_contains($notes, 'good cooperation') || str_contains($notes, 'cooperative') || str_contains($notes, 'willing')) {
            return 'good';
        } elseif (str_contains($notes, 'some cooperation') || str_contains($notes, 'reluctant') || str_contains($notes, 'hesitant')) {
            return 'fair';
        } elseif (str_contains($notes, 'poor cooperation') || str_contains($notes, 'uncooperative') || str_contains($notes, 'refused')) {
            return 'poor';
        } else {
            return 'unknown';
        }
    }

    // Check for discomfort or pain from notes
    public function hasDiscomfortReported()
    {
        if (!$this->notes) {
            return false;
        }
        
        $notes = strtolower($this->notes);
        $discomfortKeywords = ['pain', 'discomfort', 'sore', 'ache', 'hurt', 'uncomfortable', 'tired', 'fatigue', 'difficulty'];
        
        foreach ($discomfortKeywords as $keyword) {
            if (str_contains($notes, $keyword)) {
                return true;
            }
        }
        
        return false;
    }

    // Get care type based on exercise details (newborn vs elderly)
    public function getCareType()
    {
        if (!$this->mobility_assistance_details) {
            return 'unknown';
        }
        
        $details = strtolower($this->mobility_assistance_details);
        
        // Newborn-specific indicators
        $newbornKeywords = ['tummy time', 'infant', 'baby', 'developmental', 'crawling', 'sitting up'];
        foreach ($newbornKeywords as $keyword) {
            if (str_contains($details, $keyword)) {
                return 'newborn';
            }
        }
        
        // Elderly-specific indicators
        $elderlyKeywords = ['physical therapy', 'walker', 'wheelchair', 'fall prevention', 'balance training', 'gait training'];
        foreach ($elderlyKeywords as $keyword) {
            if (str_contains($details, $keyword)) {
                return 'elderly';
            }
        }
        
        return 'general';
    }

    // Scope for exercises ordered by time
    public function scopeOrderedByTime($query, $careLogId = null)
    {
        $q = $query->orderBy('exercise_time');
        
        if ($careLogId) {
            $q->where('care_log_id', $careLogId);
        }
        
        return $q;
    }

    // Scope for today's exercises
    public function scopeToday($query)
    {
        return $query->whereDate('exercise_time', today());
    }

    // Scope for exercises in progress
    public function scopeInProgress($query)
    {
        return $query->get()->filter(function($exercise) {
            return $exercise->isInProgress();
        });
    }

    // Scope for completed exercises
    public function scopeCompleted($query)
    {
        return $query->get()->filter(function($exercise) {
            return $exercise->isCompleted();
        });
    }

    // Scope for exercises by intensity
    public function scopeByIntensity($query, $intensity)
    {
        return $query->get()->filter(function($exercise) use ($intensity) {
            return $exercise->getExerciseIntensity() === $intensity;
        });
    }

    // Scope for exercises with discomfort reported
    public function scopeWithDiscomfort($query)
    {
        return $query->get()->filter(function($exercise) {
            return $exercise->hasDiscomfortReported();
        });
    }

    // Get mobility exercise statistics for a care log
    public static function getMobilityStats($careLogId)
    {
        $exercises = self::where('care_log_id', $careLogId)->get();
        
        if ($exercises->isEmpty()) {
            return null;
        }
        
        // Calculate total exercise time
        $totalMinutes = $exercises->sum(function($exercise) {
            return $exercise->getDurationInMinutes() ?? 0;
        });
        
        // Group by intensity
        $intensityBreakdown = $exercises->groupBy(function($exercise) {
            return $exercise->getExerciseIntensity();
        });
        
        // Group by cooperation level
        $cooperationBreakdown = $exercises->groupBy(function($exercise) {
            return $exercise->getCooperationLevel();
        });
        
        // Get all exercise types
        $allExerciseTypes = $exercises->flatMap(function($exercise) {
            return $exercise->getExerciseTypes();
        })->countBy();
        
        return [
            'total_exercises' => $exercises->count(),
            'total_exercise_time_minutes' => $totalMinutes,
            'total_exercise_time_formatted' => self::formatMinutes($totalMinutes),
            'average_session_duration' => $exercises->count() > 0 ? round($totalMinutes / $exercises->count()) : 0,
            'intensity_breakdown' => $intensityBreakdown->map(function($exs, $intensity) {
                return [
                    'intensity' => $intensity,
                    'count' => $exs->count(),
                    'total_minutes' => $exs->sum(fn($e) => $e->getDurationInMinutes() ?? 0),
                ];
            }),
            'cooperation_breakdown' => $cooperationBreakdown->map(function($exs, $cooperation) {
                return [
                    'cooperation_level' => $cooperation,
                    'count' => $exs->count(),
                ];
            }),
            'exercise_types' => $allExerciseTypes->sortDesc()->take(10)->toArray(),
            'discomfort_reported_count' => $exercises->filter(fn($e) => $e->hasDiscomfortReported())->count(),
            'completion_rate' => round(($exercises->filter(fn($e) => $e->isCompleted())->count() / $exercises->count()) * 100, 1),
            'care_type' => $exercises->map(fn($e) => $e->getCareType())->mode()[0] ?? 'unknown',
        ];
    }

    // Get today's exercise schedule
    public static function getTodaysExerciseSchedule($careLogId = null)
    {
        $query = self::today()->orderBy('exercise_time');
        
        if ($careLogId) {
            $query->where('care_log_id', $careLogId);
        }
        
        $exercises = $query->get();
        
        if ($exercises->isEmpty()) {
            return null;
        }
        
        return [
            'total_exercises_today' => $exercises->count(),
            'completed_exercises' => $exercises->filter(fn($e) => $e->isCompleted())->count(),
            'in_progress_exercises' => $exercises->filter(fn($e) => $e->isInProgress())->count(),
            'scheduled_exercises' => $exercises->filter(fn($e) => $e->getExerciseStatus() === 'scheduled')->count(),
            'total_planned_time' => $exercises->sum(fn($e) => $e->getDurationInMinutes() ?? 0),
            'exercise_schedule' => $exercises->map(function($exercise) {
                return [
                    'time' => $exercise->getFormattedExerciseTime(),
                    'end_time' => $exercise->getFormattedEndTime(),
                    'duration' => $exercise->getStandardizedDuration(),
                    'types' => $exercise->getExerciseTypes(),
                    'status' => $exercise->getExerciseStatus(),
                    'intensity' => $exercise->getExerciseIntensity(),
                ];
            }),
        ];
    }

    // Get exercise progress trends
    public static function getExerciseProgressTrends($careLogId, $days = 7)
    {
        $exercises = self::where('care_log_id', $careLogId)
                        ->where('exercise_time', '>=', now()->subDays($days))
                        ->get();
        
        if ($exercises->isEmpty()) {
            return null;
        }
        
        $dailyBreakdown = $exercises->groupBy(function($exercise) {
            return $exercise->exercise_time ? $exercise->exercise_time->format('Y-m-d') : 'unknown';
        });
        
        return [
            'period_days' => $days,
            'total_exercises' => $exercises->count(),
            'total_exercise_time' => $exercises->sum(fn($e) => $e->getDurationInMinutes() ?? 0),
            'daily_progress' => $dailyBreakdown->map(function($exs, $date) {
                return [
                    'date' => $date,
                    'exercise_count' => $exs->count(),
                    'total_minutes' => $exs->sum(fn($e) => $e->getDurationInMinutes() ?? 0),
                    'completed_count' => $exs->filter(fn($e) => $e->isCompleted())->count(),
                    'discomfort_count' => $exs->filter(fn($e) => $e->hasDiscomfortReported())->count(),
                    'cooperation_good' => $exs->filter(fn($e) => in_array($e->getCooperationLevel(), ['good', 'excellent']))->count(),
                ];
            })->sortBy('date')->values(),
            'average_daily_exercises' => round($exercises->count() / $days, 1),
            'average_daily_minutes' => round($exercises->sum(fn($e) => $e->getDurationInMinutes() ?? 0) / $days, 1),
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

    // Get exercise summary for reporting
    public function getExerciseSummary()
    {
        return [
            'exercise_id' => $this->id,
            'time' => $this->getFormattedExerciseTime(),
            'end_time' => $this->getFormattedEndTime(),
            'duration' => $this->getStandardizedDuration(),
            'duration_minutes' => $this->getDurationInMinutes(),
            'exercise_types' => $this->getExerciseTypes(),
            'intensity' => $this->getExerciseIntensity(),
            'status' => $this->getExerciseStatus(),
            'cooperation_level' => $this->getCooperationLevel(),
            'has_discomfort' => $this->hasDiscomfortReported(),
            'care_type' => $this->getCareType(),
            'is_in_progress' => $this->isInProgress(),
            'is_completed' => $this->isCompleted(),
            'assistance_details' => $this->mobility_assistance_details,
            'notes' => $this->notes,
        ];
    }
}
