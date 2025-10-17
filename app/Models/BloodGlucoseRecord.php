<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class BloodGlucoseRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'care_log_id',
        'measurement_time',
        'glucose_level',
        'timing',
        'notes',
    ];

    protected $casts = [
        'measurement_time' => 'datetime:H:i',
        'glucose_level' => 'decimal:2',
    ];

    // Relationships
    public function careLog()
    {
        return $this->belongsTo(CareLog::class);
    }

    // Helper method to get formatted measurement time
    public function getFormattedMeasurementTime()
    {
        if ($this->measurement_time) {
            return $this->measurement_time->format('H:i');
        }
        return null;
    }

    // Get timing display name
    public function getTimingDisplayName()
    {
        return match($this->timing) {
            'fasting' => 'Fasting',
            'random' => 'Random',
            '2hpp' => '2 Hours Post-Meal',
            default => 'Unknown'
        };
    }

    // Get glucose level with appropriate unit (assuming mg/dL for most common use)
    public function getFormattedGlucoseLevel($unit = 'mg/dL')
    {
        if ($this->glucose_level) {
            return $this->glucose_level . ' ' . $unit;
        }
        return null;
    }

    // Convert glucose level from mg/dL to mmol/L
    public function getGlucoseLevelInMmol()
    {
        if ($this->glucose_level) {
            return round($this->glucose_level / 18.0, 1); // mg/dL to mmol/L conversion
        }
        return null;
    }

    // Convert glucose level from mmol/L to mg/dL
    public function getGlucoseLevelInMgDl()
    {
        if ($this->glucose_level) {
            return round($this->glucose_level * 18.0, 0); // mmol/L to mg/dL conversion
        }
        return null;
    }

    // Check if glucose level is within normal range (based on timing)
    public function isGlucoseLevelNormal($unit = 'mg/dL')
    {
        if (!$this->glucose_level || !$this->timing) {
            return null;
        }

        $level = $this->glucose_level;

        if ($unit === 'mg/dL') {
            return match($this->timing) {
                'fasting' => $level >= 70 && $level <= 100,      // Normal fasting: 70-100 mg/dL
                'random' => $level < 200,                         // Normal random: < 200 mg/dL
                '2hpp' => $level < 140,                          // Normal 2HPP: < 140 mg/dL
                default => null
            };
        } else { // mmol/L
            $mmolLevel = $this->getGlucoseLevelInMmol();
            return match($this->timing) {
                'fasting' => $mmolLevel >= 3.9 && $mmolLevel <= 5.6,  // Normal fasting: 3.9-5.6 mmol/L
                'random' => $mmolLevel < 11.1,                         // Normal random: < 11.1 mmol/L
                '2hpp' => $mmolLevel < 7.8,                           // Normal 2HPP: < 7.8 mmol/L
                default => null
            };
        }
    }

    // Check if glucose level indicates prediabetes
    public function isPrediabetic($unit = 'mg/dL')
    {
        if (!$this->glucose_level || !$this->timing) {
            return null;
        }

        $level = $this->glucose_level;

        if ($unit === 'mg/dL') {
            return match($this->timing) {
                'fasting' => $level >= 100 && $level <= 125,     // Prediabetic fasting: 100-125 mg/dL
                'random' => false,                                // No specific prediabetic range for random
                '2hpp' => $level >= 140 && $level <= 199,       // Prediabetic 2HPP: 140-199 mg/dL
                default => false
            };
        } else { // mmol/L
            $mmolLevel = $this->getGlucoseLevelInMmol();
            return match($this->timing) {
                'fasting' => $mmolLevel >= 5.6 && $mmolLevel <= 6.9,  // Prediabetic fasting: 5.6-6.9 mmol/L
                'random' => false,                                      // No specific prediabetic range for random
                '2hpp' => $mmolLevel >= 7.8 && $mmolLevel <= 11.0,    // Prediabetic 2HPP: 7.8-11.0 mmol/L
                default => false
            };
        }
    }

    // Check if glucose level indicates diabetes
    public function isDiabetic($unit = 'mg/dL')
    {
        if (!$this->glucose_level || !$this->timing) {
            return null;
        }

        $level = $this->glucose_level;

        if ($unit === 'mg/dL') {
            return match($this->timing) {
                'fasting' => $level >= 126,                      // Diabetic fasting: ≥ 126 mg/dL
                'random' => $level >= 200,                       // Diabetic random: ≥ 200 mg/dL
                '2hpp' => $level >= 200,                        // Diabetic 2HPP: ≥ 200 mg/dL
                default => false
            };
        } else { // mmol/L
            $mmolLevel = $this->getGlucoseLevelInMmol();
            return match($this->timing) {
                'fasting' => $mmolLevel >= 7.0,                  // Diabetic fasting: ≥ 7.0 mmol/L
                'random' => $mmolLevel >= 11.1,                  // Diabetic random: ≥ 11.1 mmol/L
                '2hpp' => $mmolLevel >= 11.1,                   // Diabetic 2HPP: ≥ 11.1 mmol/L
                default => false
            };
        }
    }

    // Check if glucose level is critically low (hypoglycemia)
    public function isHypoglycemic($unit = 'mg/dL')
    {
        if (!$this->glucose_level) {
            return false;
        }

        if ($unit === 'mg/dL') {
            return $this->glucose_level < 70;  // Hypoglycemia: < 70 mg/dL
        } else { // mmol/L
            $mmolLevel = $this->getGlucoseLevelInMmol();
            return $mmolLevel < 3.9;  // Hypoglycemia: < 3.9 mmol/L
        }
    }

    // Check if glucose level is critically high (severe hyperglycemia)
    public function isSeverelyHyperglycemic($unit = 'mg/dL')
    {
        if (!$this->glucose_level) {
            return false;
        }

        if ($unit === 'mg/dL') {
            return $this->glucose_level > 400;  // Severe hyperglycemia: > 400 mg/dL
        } else { // mmol/L
            $mmolLevel = $this->getGlucoseLevelInMmol();
            return $mmolLevel > 22.2;  // Severe hyperglycemia: > 22.2 mmol/L
        }
    }

    // Get glucose status (normal, prediabetic, diabetic, etc.)
    public function getGlucoseStatus($unit = 'mg/dL')
    {
        if ($this->isHypoglycemic($unit)) {
            return 'hypoglycemic';
        } elseif ($this->isSeverelyHyperglycemic($unit)) {
            return 'severely_hyperglycemic';
        } elseif ($this->isDiabetic($unit)) {
            return 'diabetic';
        } elseif ($this->isPrediabetic($unit)) {
            return 'prediabetic';
        } elseif ($this->isGlucoseLevelNormal($unit)) {
            return 'normal';
        } else {
            return 'unknown';
        }
    }

    // Get status color for UI
    public function getStatusColor($unit = 'mg/dL')
    {
        return match($this->getGlucoseStatus($unit)) {
            'normal' => '#4caf50',              // Green
            'prediabetic' => '#ff9800',         // Orange
            'diabetic' => '#f44336',            // Red
            'hypoglycemic' => '#9c27b0',        // Purple
            'severely_hyperglycemic' => '#d32f2f', // Dark Red
            default => '#757575'                // Gray
        };
    }

    // Get status icon for UI
    public function getStatusIcon($unit = 'mg/dL')
    {
        return match($this->getGlucoseStatus($unit)) {
            'normal' => 'check_circle',
            'prediabetic' => 'warning',
            'diabetic' => 'error',
            'hypoglycemic' => 'arrow_downward',
            'severely_hyperglycemic' => 'keyboard_double_arrow_up',
            default => 'help'
        };
    }

    // Check if reading requires immediate medical attention
    public function requiresImmediateAttention($unit = 'mg/dL')
    {
        return $this->isHypoglycemic($unit) || $this->isSeverelyHyperglycemic($unit);
    }

    // Scope for today's readings
    public function scopeToday($query)
    {
        return $query->whereDate('measurement_time', today());
    }

    // Scope for readings by timing type
    public function scopeByTiming($query, $timing)
    {
        return $query->where('timing', $timing);
    }

    // Scope for abnormal readings
    public function scopeAbnormal($query, $unit = 'mg/dL')
    {
        return $query->get()->filter(function($record) use ($unit) {
            return !$record->isGlucoseLevelNormal($unit);
        });
    }

    // Scope for critical readings (hypo/severe hyperglycemia)
    public function scopeCritical($query, $unit = 'mg/dL')
    {
        return $query->get()->filter(function($record) use ($unit) {
            return $record->requiresImmediateAttention($unit);
        });
    }

    // Scope for diabetic range readings
    public function scopeDiabetic($query, $unit = 'mg/dL')
    {
        return $query->get()->filter(function($record) use ($unit) {
            return $record->isDiabetic($unit);
        });
    }

    // Scope for readings ordered by time
    public function scopeOrderedByTime($query, $careLogId = null)
    {
        $q = $query->orderBy('measurement_time');
        
        if ($careLogId) {
            $q->where('care_log_id', $careLogId);
        }
        
        return $q;
    }

    // Get blood glucose statistics for a care log
    public static function getGlucoseStats($careLogId, $unit = 'mg/dL')
    {
        $records = self::where('care_log_id', $careLogId)
                      ->whereNotNull('glucose_level')
                      ->get();
        
        if ($records->isEmpty()) {
            return null;
        }
        
        // Group by timing
        $timingBreakdown = $records->groupBy('timing');
        
        // Group by status
        $statusBreakdown = $records->groupBy(function($record) use ($unit) {
            return $record->getGlucoseStatus($unit);
        });
        
        return [
            'total_readings' => $records->count(),
            'average_glucose' => round($records->avg('glucose_level'), 1),
            'min_glucose' => $records->min('glucose_level'),
            'max_glucose' => $records->max('glucose_level'),
            'unit' => $unit,
            'timing_breakdown' => $timingBreakdown->map(function($readings, $timing) use ($unit) {
                return [
                    'timing' => $timing,
                    'display_name' => $readings->first()->getTimingDisplayName(),
                    'count' => $readings->count(),
                    'average' => round($readings->avg('glucose_level'), 1),
                    'normal_count' => $readings->filter(fn($r) => $r->isGlucoseLevelNormal($unit))->count(),
                ];
            }),
            'status_breakdown' => $statusBreakdown->map(function($readings, $status) {
                return [
                    'status' => $status,
                    'count' => $readings->count(),
                ];
            }),
            'critical_readings' => $records->filter(fn($r) => $r->requiresImmediateAttention($unit))->count(),
            'normal_readings' => $records->filter(fn($r) => $r->isGlucoseLevelNormal($unit))->count(),
            'diabetic_readings' => $records->filter(fn($r) => $r->isDiabetic($unit))->count(),
            'control_percentage' => round(($records->filter(fn($r) => $r->isGlucoseLevelNormal($unit))->count() / $records->count()) * 100, 1),
        ];
    }

    // Get glucose trends over time
    public static function getGlucoseTrends($careLogId, $days = 7, $unit = 'mg/dL')
    {
        $records = self::where('care_log_id', $careLogId)
                      ->where('measurement_time', '>=', now()->subDays($days))
                      ->whereNotNull('glucose_level')
                      ->orderBy('measurement_time')
                      ->get();
        
        if ($records->isEmpty()) {
            return null;
        }
        
        $dailyBreakdown = $records->groupBy(function($record) {
            return $record->measurement_time ? $record->measurement_time->format('Y-m-d') : 'unknown';
        });
        
        return [
            'period_days' => $days,
            'total_readings' => $records->count(),
            'overall_average' => round($records->avg('glucose_level'), 1),
            'daily_trends' => $dailyBreakdown->map(function($readings, $date) use ($unit) {
                return [
                    'date' => $date,
                    'reading_count' => $readings->count(),
                    'average_glucose' => round($readings->avg('glucose_level'), 1),
                    'min_glucose' => $readings->min('glucose_level'),
                    'max_glucose' => $readings->max('glucose_level'),
                    'normal_readings' => $readings->filter(fn($r) => $r->isGlucoseLevelNormal($unit))->count(),
                    'critical_readings' => $readings->filter(fn($r) => $r->requiresImmediateAttention($unit))->count(),
                ];
            })->sortBy('date')->values(),
            'trend_direction' => self::calculateTrendDirection($records),
            'unit' => $unit,
        ];
    }

    // Calculate trend direction (improving, worsening, stable)
    private static function calculateTrendDirection($records)
    {
        if ($records->count() < 3) {
            return 'insufficient_data';
        }
        
        $recentReadings = $records->sortBy('measurement_time')->take(-3);
        $olderReadings = $records->sortBy('measurement_time')->take(3);
        
        $recentAvg = $recentReadings->avg('glucose_level');
        $olderAvg = $olderReadings->avg('glucose_level');
        
        $difference = $recentAvg - $olderAvg;
        
        if (abs($difference) < 10) {
            return 'stable';
        } elseif ($difference > 0) {
            return 'increasing';
        } else {
            return 'decreasing';
        }
    }

    // Get glucose record summary for reporting
    public function getGlucoseSummary($unit = 'mg/dL')
    {
        return [
            'record_id' => $this->id,
            'time' => $this->getFormattedMeasurementTime(),
            'glucose_level' => $this->getFormattedGlucoseLevel($unit),
            'timing' => $this->getTimingDisplayName(),
            'status' => $this->getGlucoseStatus($unit),
            'status_color' => $this->getStatusColor($unit),
            'status_icon' => $this->getStatusIcon($unit),
            'is_normal' => $this->isGlucoseLevelNormal($unit),
            'requires_attention' => $this->requiresImmediateAttention($unit),
            'notes' => $this->notes,
        ];
    }
}
