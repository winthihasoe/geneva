<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'care_log_id',
        'activity_time',
        'activity_type',
        'duration',
        'notes', 
    ];

    protected $casts = [
        'activity_time' => 'datetime:H:i',
    ];

    // Relationships
    public function careLog()
    {
        return $this->belongsTo(CareLog::class);
    }

    // Scope for daily activity count
    public function scopeDailyCount($query, $careLogId)
    {
        return $query->where('care_log_id', $careLogId)->count();
    }

    // Scope for activity type count
    public function scopeActivityTypeCount($query, $careLogId, $activityType)
    {
        return $query->where('care_log_id', $careLogId)
                    ->where('activity_type', $activityType)
                    ->count();
    }

    // Scope for activities ordered by time
    public function scopeOrderedByTime($query, $careLogId)
    {
        return $query->where('care_log_id', $careLogId)
                    ->orderBy('activity_time');
    }

    // Get activity statistics for a care log
    public static function getActivityStats($careLogId)
    {
        $records = self::where('care_log_id', $careLogId)->get();
        $activityTypes = $records->groupBy('activity_type');
        
        return [
            'total_activities' => $records->count(),
            'activity_breakdown' => $activityTypes->map(function ($activities, $type) {
                return [
                    'type' => $type,
                    'count' => $activities->count(),
                    'sessions' => $activities->pluck('duration')->filter()->toArray()
                ];
            }),
            'unique_activity_types' => $activityTypes->keys()->toArray(),
        ];
    }
}
