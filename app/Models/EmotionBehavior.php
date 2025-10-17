<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmotionBehavior extends Model
{
    use HasFactory;

    protected $fillable = [
        'care_log_id',
        'mood',
        'behavior',      // Added for maternal and elderly care logs
        'symptoms',
        'medications',
        'action_taken',
    ];

    // Relationships
    public function careLog()
    {
        return $this->belongsTo(CareLog::class);
    }

    // Helper method to check if any behavior data exists
    public function hasData()
    {
        return !empty($this->mood) || 
               !empty($this->behavior) || 
               !empty($this->symptoms) || 
               !empty($this->action_taken);
    }

    // Helper method to check if newborn-specific data exists
    public function hasNewbornData()
    {
        return !empty($this->mood) || !empty($this->symptoms) || !empty($this->action_taken);
    }

    // Helper method to check if maternal/elderly-specific data exists
    public function hasMaternalElderlyData()
    {
        return !empty($this->behavior) || !empty($this->mood) || !empty($this->symptoms) || !empty($this->action_taken);
    }

    // Get mood/behavior summary for reporting
    public static function getEmotionBehaviorStats($careLogId)
    {
        $record = self::where('care_log_id', $careLogId)->first();
        
        if (!$record) {
            return null;
        }
        
        return [
            'mood' => $record->mood,
            'behavior' => $record->behavior,
            'has_symptoms' => !empty($record->symptoms),
            'has_action_taken' => !empty($record->action_taken),
            'overall_status' => $record->getOverallStatus(),
            'care_type_data' => $record->getCareTypeData(),
        ];
    }

    // Get overall health status based on symptoms, mood, and behavior
    public function getOverallStatus()
    {
        // Priority: symptoms first, then behavior/mood
        if (!empty($this->symptoms)) {
            return 'needs_attention';
        } 
        
        $positiveKeywords = ['happy', 'content', 'calm', 'peaceful', 'good', 'stable', 'cooperative'];
        $concernKeywords = ['agitated', 'crying', 'fussy', 'restless', 'aggressive', 'withdrawn', 'confused'];
        
        $moodText = strtolower($this->mood ?? '');
        $behaviorText = strtolower($this->behavior ?? '');
        $combinedText = $moodText . ' ' . $behaviorText;
        
        foreach ($concernKeywords as $keyword) {
            if (str_contains($combinedText, $keyword)) {
                return 'monitoring_required';
            }
        }
        
        foreach ($positiveKeywords as $keyword) {
            if (str_contains($combinedText, $keyword)) {
                return 'good';
            }
        }
        
        if (!empty($this->mood) || !empty($this->behavior)) {
            return 'monitoring';
        }
        
        return 'no_data';
    }

    // Get data specific to care type
    public function getCareTypeData()
    {
        return [
            'newborn' => [
                'mood' => $this->mood,
                'symptoms' => $this->symptoms,
                'action_taken' => $this->action_taken,
            ],
            'maternal_elderly' => [
                'mood' => $this->mood,
                'behavior' => $this->behavior,
                'symptoms' => $this->symptoms,
                'action_taken' => $this->action_taken,
            ],
        ];
    }

    // Scope for records with behavior data (maternal/elderly)
    public function scopeWithBehaviorData($query)
    {
        return $query->whereNotNull('behavior')->where('behavior', '!=', '');
    }

    // Scope for records without behavior data (newborn)
    public function scopeWithoutBehaviorData($query)
    {
        return $query->where(function ($q) {
            $q->whereNull('behavior')->orWhere('behavior', '');
        });
    }
}
