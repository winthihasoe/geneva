<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class SleepRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'care_log_id',
        'type',
        'sleep_start_time',
        'sleep_end_time',
        'duration',
        'sleep_quality',
        'sleep_issues', 
        'notes',
    ];

    protected $casts = [
        'sleep_start_time' => 'datetime:H:i',
        'sleep_end_time' => 'datetime:H:i',
    ];

    // Relationships
    public function careLog()
    {
        return $this->belongsTo(CareLog::class);
    }

    // Helper method to calculate duration in minutes
    public function getDurationInMinutes()
    {
        if ($this->sleep_start_time && $this->sleep_end_time) {
            $start = Carbon::parse($this->sleep_start_time);
            $end = Carbon::parse($this->sleep_end_time);
            
            // Handle overnight sleep (end time next day)
            if ($end < $start) {
                $end->addDay();
            }
            
            return $start->diffInMinutes($end);
        }
        
        return null;
    }

    // Helper method to format duration
    public function getFormattedDuration()
    {
        $minutes = $this->getDurationInMinutes();
        
        if ($minutes) {
            $hours = floor($minutes / 60);
            $mins = $minutes % 60;
            
            if ($hours > 0) {
                return $hours . 'h ' . $mins . 'm';
            } else {
                return $mins . 'm';
            }
        }
        
        return $this->duration; // Fallback to manual entry
    }

    // NEW: Check if this is an elderly care record
    public function isElderlyCareRecord()
    {
        return !empty($this->sleep_quality) || !empty($this->sleep_issues);
    }

    // NEW: Get sleep quality status
    public function getSleepQualityStatus()
    {
        if (empty($this->sleep_quality)) {
            return 'not_assessed';
        }
        
        return strtolower($this->sleep_quality);
    }

    // NEW: Check if sleep had issues
    public function hasSleepIssues()
    {
        return !empty($this->sleep_issues) && $this->sleep_issues !== 'none';
    }

    // NEW: Get parsed sleep issues as array
    public function getSleepIssuesArray()
    {
        if (empty($this->sleep_issues) || $this->sleep_issues === 'none') {
            return [];
        }
        
        // Handle comma-separated values or single value
        return array_map('trim', explode(',', $this->sleep_issues));
    }

    // NEW: Scope for records with quality assessment (elderly care)
    public function scopeWithQualityAssessment($query)
    {
        return $query->whereNotNull('sleep_quality')
                    ->where('sleep_quality', '!=', '');
    }

    // NEW: Scope for records without quality assessment (newborn care)
    public function scopeWithoutQualityAssessment($query)
    {
        return $query->where(function($q) {
            $q->whereNull('sleep_quality')
              ->orWhere('sleep_quality', '');
        });
    }

    // NEW: Scope for poor quality sleep
    public function scopePoorQuality($query)
    {
        return $query->where('sleep_quality', 'poor');
    }

    // NEW: Scope for sleep with issues
    public function scopeWithIssues($query)
    {
        return $query->whereNotNull('sleep_issues')
                    ->where('sleep_issues', '!=', '')
                    ->where('sleep_issues', '!=', 'none');
    }

    // Scope for daily sleep total in minutes
    public function scopeDailySleepTotal($query, $careLogId)
    {
        return $query->where('care_log_id', $careLogId)
                    ->get()
                    ->sum(function ($record) {
                        return $record->getDurationInMinutes() ?? 0;
                    });
    }

    // Scope for sleep records ordered by start time
    public function scopeOrderedByTime($query, $careLogId)
    {
        return $query->where('care_log_id', $careLogId)
                    ->orderBy('sleep_start_time');
    }

    // UPDATED: Get sleep statistics for a care log (enhanced for elderly care)
    public static function getSleepStats($careLogId)
    {
        $records = self::where('care_log_id', $careLogId)->get();
        $totalMinutes = $records->sum(function ($record) {
            return $record->getDurationInMinutes() ?? 0;
        });
        
        // Basic stats
        $stats = [
            'total_sleep_time' => $totalMinutes,
            'total_sleep_formatted' => self::formatMinutes($totalMinutes),
            'sleep_sessions' => $records->count(),
            'average_session' => $records->count() > 0 ? round($totalMinutes / $records->count()) : 0,
            'average_session_formatted' => $records->count() > 0 ? self::formatMinutes(round($totalMinutes / $records->count())) : '0m',
        ];

        // Add elderly care specific stats if applicable
        $elderlyRecords = $records->filter(function($record) {
            return $record->isElderlyCareRecord();
        });

        if ($elderlyRecords->count() > 0) {
            $qualityBreakdown = $elderlyRecords->whereNotNull('sleep_quality')
                                             ->where('sleep_quality', '!=', '')
                                             ->groupBy('sleep_quality');
            
            $issuesRecords = $elderlyRecords->filter(function($record) {
                return $record->hasSleepIssues();
            });

            $stats['elderly_care_stats'] = [
                'total_elderly_records' => $elderlyRecords->count(),
                'quality_breakdown' => [
                    'good' => $qualityBreakdown->get('good', collect())->count(),
                    'fair' => $qualityBreakdown->get('fair', collect())->count(),
                    'poor' => $qualityBreakdown->get('poor', collect())->count(),
                ],
                'sleep_issues' => [
                    'total_with_issues' => $issuesRecords->count(),
                    'issue_types' => $issuesRecords->flatMap(function($record) {
                        return $record->getSleepIssuesArray();
                    })->countBy()->toArray(),
                ],
                'quality_percentage' => [
                    'good_rate' => $elderlyRecords->count() > 0 ? round(($qualityBreakdown->get('good', collect())->count() / $elderlyRecords->count()) * 100, 1) : 0,
                    'poor_rate' => $elderlyRecords->count() > 0 ? round(($qualityBreakdown->get('poor', collect())->count() / $elderlyRecords->count()) * 100, 1) : 0,
                ],
            ];
        }
        
        return $stats;
    }

    // NEW: Get sleep quality summary for elderly care
    public static function getSleepQualitySummary($careLogId)
    {
        $elderlyRecords = self::withQualityAssessment()
                             ->where('care_log_id', $careLogId)
                             ->get();
        
        if ($elderlyRecords->isEmpty()) {
            return null;
        }
        
        $qualityBreakdown = $elderlyRecords->groupBy('sleep_quality');
        $issuesRecords = $elderlyRecords->filter(function($record) {
            return $record->hasSleepIssues();
        });
        
        return [
            'total_assessed_sessions' => $elderlyRecords->count(),
            'quality_distribution' => [
                'good' => $qualityBreakdown->get('good', collect())->count(),
                'fair' => $qualityBreakdown->get('fair', collect())->count(),
                'poor' => $qualityBreakdown->get('poor', collect())->count(),
            ],
            'common_issues' => $issuesRecords->flatMap(function($record) {
                return $record->getSleepIssuesArray();
            })->countBy()->sortDesc()->take(5)->toArray(),
            'sessions_with_issues' => $issuesRecords->count(),
            'average_quality_score' => self::calculateAverageQualityScore($elderlyRecords),
        ];
    }

    // NEW: Calculate average quality score (Good=3, Fair=2, Poor=1)
    private static function calculateAverageQualityScore($records)
    {
        $scores = $records->map(function($record) {
            return match(strtolower($record->sleep_quality)) {
                'good' => 3,
                'fair' => 2,
                'poor' => 1,
                default => 0
            };
        })->filter();
        
        return $scores->count() > 0 ? round($scores->average(), 2) : 0;
    }

    // NEW: Get care type specific data
    public function getCareTypeData()
    {
        return [
            'newborn' => [
                'sleep_start_time' => $this->sleep_start_time,
                'sleep_end_time' => $this->sleep_end_time,
                'duration' => $this->duration,
                'notes' => $this->notes,
            ],
            'elderly' => [
                'sleep_start_time' => $this->sleep_start_time,
                'sleep_end_time' => $this->sleep_end_time,
                'duration' => $this->duration,
                'sleep_quality' => $this->sleep_quality,
                'sleep_issues' => $this->sleep_issues,
                'notes' => $this->notes,
            ],
        ];
    }

    // Helper to format minutes to hours and minutes
    private static function formatMinutes($minutes)
    {
        $hours = floor($minutes / 60);
        $mins = $minutes % 60;
        
        if ($hours > 0) {
            return $hours . 'h ' . $mins . 'm';
        } else {
            return $mins . 'm';
        }
    }
}
