<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HygieneRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'care_log_id',
        'hygiene_time',
        'hygiene_activity',
        'products_used',
        'notes',
        'moisturizer_applied',    
        'pressure_areas_checked', 
        'skin_care_findings',     
    ];

    protected $casts = [
        'hygiene_time' => 'datetime:H:i',
        'moisturizer_applied' => 'boolean',
        'pressure_areas_checked' => 'boolean',
    ];

    // Relationships
    public function careLog()
    {
        return $this->belongsTo(CareLog::class);
    }

    // Scope for daily hygiene activity count
    public function scopeDailyCount($query, $careLogId)
    {
        return $query->where('care_log_id', $careLogId)->count();
    }

    // Scope for hygiene activity type count
    public function scopeActivityTypeCount($query, $careLogId, $activityType)
    {
        return $query->where('care_log_id', $careLogId)
                    ->where('hygiene_activity', $activityType)
                    ->count();
    }

    // Scope for hygiene records ordered by time
    public function scopeOrderedByTime($query, $careLogId)
    {
        return $query->where('care_log_id', $careLogId)
                    ->orderBy('hygiene_time');
    }

    // NEW: Scope for records with skin care data (elderly care)
    public function scopeWithSkinCare($query)
    {
        return $query->where(function($q) {
            $q->where('moisturizer_applied', true)
              ->orWhere('pressure_areas_checked', true)
              ->orWhereNotNull('skin_care_findings');
        });
    }

    // NEW: Scope for records without skin care data (newborn care)
    public function scopeWithoutSkinCare($query)
    {
        return $query->where('moisturizer_applied', false)
                    ->where('pressure_areas_checked', false)
                    ->whereNull('skin_care_findings');
    }

    // NEW: Check if this is an elderly care record
    public function isElderlyCareRecord()
    {
        return $this->moisturizer_applied || 
               $this->pressure_areas_checked || 
               !empty($this->skin_care_findings);
    }

    // NEW: Check if skin care was performed
    public function hasSkinCarePerformed()
    {
        return $this->moisturizer_applied || $this->pressure_areas_checked;
    }

    // NEW: Get skin care status for reporting
    public function getSkinCareStatus()
    {
        if (!$this->isElderlyCareRecord()) {
            return 'not_applicable'; // For newborn care
        }

        $status = [];
        
        if ($this->moisturizer_applied) {
            $status[] = 'moisturizer_applied';
        }
        
        if ($this->pressure_areas_checked) {
            $status[] = 'pressure_areas_checked';
        }
        
        if (!empty($this->skin_care_findings)) {
            $status[] = 'findings_documented';
        }
        
        return empty($status) ? 'no_skin_care' : $status;
    }

    // UPDATED: Get hygiene statistics for a care log (enhanced for elderly care)
    public static function getHygieneStats($careLogId)
    {
        $records = self::where('care_log_id', $careLogId)->get();
        $activityTypes = $records->groupBy('hygiene_activity');
        
        // Separate elderly care records
        $elderlyRecords = $records->filter(function($record) {
            return $record->isElderlyCareRecord();
        });
        
        $stats = [
            'total_hygiene_activities' => $records->count(),
            'activity_breakdown' => $activityTypes->map(function ($activities, $type) {
                return [
                    'type' => $type,
                    'count' => $activities->count(),
                    'products_used' => $activities->pluck('products_used')->filter()->unique()->toArray()
                ];
            }),
            'unique_activity_types' => $activityTypes->keys()->toArray(),
            'products_summary' => $records->pluck('products_used')->filter()->unique()->toArray(),
        ];

        // Add elderly care specific stats
        if ($elderlyRecords->count() > 0) {
            $stats['elderly_care_stats'] = [
                'total_elderly_records' => $elderlyRecords->count(),
                'moisturizer_applications' => $elderlyRecords->where('moisturizer_applied', true)->count(),
                'pressure_area_checks' => $elderlyRecords->where('pressure_areas_checked', true)->count(),
                'skin_findings_documented' => $elderlyRecords->whereNotNull('skin_care_findings')->count(),
                'skin_care_compliance' => [
                    'moisturizer_rate' => round(($elderlyRecords->where('moisturizer_applied', true)->count() / $elderlyRecords->count()) * 100, 1),
                    'pressure_check_rate' => round(($elderlyRecords->where('pressure_areas_checked', true)->count() / $elderlyRecords->count()) * 100, 1),
                ],
            ];
        }
        
        return $stats;
    }

    // NEW: Get skin care summary for elderly care
    public static function getSkinCareSummary($careLogId)
    {
        $elderlyRecords = self::withSkinCare()
                             ->where('care_log_id', $careLogId)
                             ->get();
        
        if ($elderlyRecords->isEmpty()) {
            return null;
        }
        
        return [
            'total_skin_care_activities' => $elderlyRecords->count(),
            'moisturizer_applications' => $elderlyRecords->where('moisturizer_applied', true)->count(),
            'pressure_area_checks' => $elderlyRecords->where('pressure_areas_checked', true)->count(),
            'documented_findings' => $elderlyRecords->whereNotNull('skin_care_findings')
                                                   ->pluck('skin_care_findings')
                                                   ->filter()
                                                   ->toArray(),
            'care_times' => $elderlyRecords->pluck('hygiene_time')
                                          ->filter()
                                          ->sort()
                                          ->values()
                                          ->toArray(),
        ];
    }

    // UPDATED: Get most frequently used products for a care log (enhanced)
    public static function getMostUsedProducts($careLogId, $limit = 5)
    {
        return self::where('care_log_id', $careLogId)
                  ->whereNotNull('products_used')
                  ->where('products_used', '!=', '')
                  ->get()
                  ->pluck('products_used')
                  ->countBy()
                  ->sortDesc()
                  ->take($limit);
    }

    // NEW: Get care type specific data
    public function getCareTypeData()
    {
        return [
            'newborn' => [
                'hygiene_time' => $this->hygiene_time,
                'hygiene_activity' => $this->hygiene_activity,
                'products_used' => $this->products_used,
                'notes' => $this->notes,
            ],
            'elderly' => [
                'hygiene_time' => $this->hygiene_time,
                'hygiene_activity' => $this->hygiene_activity,
                'products_used' => $this->products_used,
                'notes' => $this->notes,
                'moisturizer_applied' => $this->moisturizer_applied,
                'pressure_areas_checked' => $this->pressure_areas_checked,
                'skin_care_findings' => $this->skin_care_findings,
            ],
        ];
    }
}
