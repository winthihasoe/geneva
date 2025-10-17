<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class FetalHealthRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'care_log_id',
        'fetal_movement_detected',
        'kick_count',
        'fetal_heart_sound',
        'notes',
    ];

    protected $casts = [
        'fetal_movement_detected' => 'boolean',
        'kick_count' => 'integer',
        'fetal_heart_sound' => 'integer',
    ];

    // Relationships
    public function careLog()
    {
        return $this->belongsTo(CareLog::class);
    }

    // Check if fetal movement was detected
    public function hasFetalMovement()
    {
        return $this->fetal_movement_detected === true;
    }

    // Get kick count status based on normal ranges
    public function getKickCountStatus()
    {
        if (!$this->kick_count) {
            return 'unknown';
        }

        if ($this->kick_count >= 10) {
            return 'normal';
        } elseif ($this->kick_count >= 6) {
            return 'reduced';
        } else {
            return 'concerning';
        }
    }

    // Get fetal heart rate status (110-160 BPM normal)
    public function getFetalHeartRateStatus()
    {
        if (!$this->fetal_heart_sound) {
            return 'unknown';
        }

        $heartRate = $this->fetal_heart_sound;

        if ($heartRate >= 110 && $heartRate <= 160) {
            return 'normal';
        } elseif ($heartRate < 110) {
            return 'bradycardia';
        } elseif ($heartRate > 160) {
            return 'tachycardia';
        } else {
            return 'unknown';
        }
    }

    // Check if this record indicates any concerns
    public function hasConcerns()
    {
        $kickStatus = $this->getKickCountStatus();
        $heartRateStatus = $this->getFetalHeartRateStatus();
        
        return in_array($kickStatus, ['reduced', 'concerning']) || 
               in_array($heartRateStatus, ['bradycardia', 'tachycardia']) ||
               !$this->hasFetalMovement();
    }

    // Get overall fetal wellbeing status
    public function getFetalWellbeingStatus()
    {
        if ($this->hasConcerns()) {
            $kickStatus = $this->getKickCountStatus();
            $heartRateStatus = $this->getFetalHeartRateStatus();
            
            if ($kickStatus === 'concerning' || $heartRateStatus === 'bradycardia' || $heartRateStatus === 'tachycardia') {
                return 'urgent_attention_needed';
            } else {
                return 'monitoring_required';
            }
        } elseif ($this->hasFetalMovement()) {
            return 'normal';
        } else {
            return 'insufficient_data';
        }
    }

    // Get status color for UI
    public function getStatusColor()
    {
        return match($this->getFetalWellbeingStatus()) {
            'normal' => '#4caf50',                    // Green
            'monitoring_required' => '#ff9800',      // Orange
            'urgent_attention_needed' => '#f44336',  // Red
            'insufficient_data' => '#9e9e9e',        // Gray
            default => '#757575'
        };
    }

    // Basic scopes
    public function scopeWithMovement($query)
    {
        return $query->where('fetal_movement_detected', true);
    }

    public function scopeToday($query)
    {
        return $query->whereDate('created_at', today());
    }

    public function scopeRequiringAttention($query)
    {
        return $query->get()->filter(function($record) {
            return $record->hasConcerns();
        });
    }

    // Get basic fetal health statistics
    public static function getFetalHealthStats($careLogId)
    {
        $records = self::where('care_log_id', $careLogId)->get();
        
        if ($records->isEmpty()) {
            return null;
        }
        
        return [
            'total_records' => $records->count(),
            'movement_detected_count' => $records->filter(fn($r) => $r->hasFetalMovement())->count(),
            'records_with_concerns' => $records->filter(fn($r) => $r->hasConcerns())->count(),
            'average_kick_count' => $records->whereNotNull('kick_count')->avg('kick_count'),
            'average_heart_rate' => $records->whereNotNull('fetal_heart_sound')->avg('fetal_heart_sound'),
        ];
    }

    // Get simple summary for reporting
    public function getFetalHealthSummary()
    {
        return [
            'movement_detected' => $this->hasFetalMovement(),
            'kick_count' => $this->kick_count,
            'kick_count_status' => $this->getKickCountStatus(),
            'fetal_heart_rate' => $this->fetal_heart_sound,
            'heart_rate_status' => $this->getFetalHeartRateStatus(),
            'wellbeing_status' => $this->getFetalWellbeingStatus(),
            'has_concerns' => $this->hasConcerns(),
            'notes' => $this->notes,
        ];
    }
}
