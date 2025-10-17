<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiaperChange extends Model
{
    use HasFactory;

    protected $fillable = [
        'care_log_id',
        'change_time',
        'diaper_content',
        'notes',
    ];

    protected $casts = [
        'change_time' => 'datetime:H:i',
    ];

    // Relationships
    public function careLog()
    {
        return $this->belongsTo(CareLog::class);
    }

    // Scope for daily diaper change count
    public function scopeDailyCount($query, $careLogId)
    {
        return $query->where('care_log_id', $careLogId)->count();
    }

    // Scope for diaper content statistics
    public function scopeContentCount($query, $careLogId, $content)
    {
        return $query->where('care_log_id', $careLogId)
                    ->where('diaper_content', $content)
                    ->count();
    }

    // Helper method to get content statistics for a care log
    public static function getContentStats($careLogId)
    {
        return [
            'wet' => self::contentCount($careLogId, 'Wet'),
            'dirty' => self::contentCount($careLogId, 'Dirty'),
            'both' => self::contentCount($careLogId, 'Both'),
            'total' => self::dailyCount($careLogId),
        ];
    }

    // Get all diaper changes for a specific day ordered by time
    public function scopeForDay($query, $careLogId)
    {
        return $query->where('care_log_id', $careLogId)
                    ->orderBy('change_time');
    }
}
