<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CareLog extends Model
{
    use HasFactory;

    protected $fillable = [
        // Foreign keys
        'cv_id',
        'patient_id',
        'care_plan_id',
        
        // Care type
        'care_type',
        
        // Basic Information
        'care_date',
        'first_name',
        'last_name',
        'age',
        'weight_kg',
        'height_cm',
        
        // Additional Notes/Observations
        'additional_notes',
        
        // Signatures - Updated to match migration
        'caregiver_name',
        'caregiver_signature',
        'guardian_name',
        'guardian_signature',
        'guardian_comment',
    ];

    protected $casts = [
        'care_date' => 'date',
        'weight_kg' => 'decimal:2',
        'height_cm' => 'decimal:1',
    ];

    // Relationships
    public function cv()
    {
        return $this->belongsTo(Cv::class);
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function carePlan()
    {
        return $this->belongsTo(CarePlan::class);
    }

    public function emotionBehavior()
    {
        return $this->hasOne(EmotionBehavior::class);
    }

    public function feedingRecords()
    {
        return $this->hasMany(FeedingRecord::class);
    }

    public function diaperChanges()
    {
        return $this->hasMany(DiaperChange::class);
    }

    public function sleepRecords()
    {
        return $this->hasMany(SleepRecord::class);
    }

    public function activityRecords()
    {
        return $this->hasMany(ActivityRecord::class);
    }

    public function hygieneRecords()
    {
        return $this->hasMany(HygieneRecord::class);
    }

    public function vitalSigns()
    {
        return $this->hasMany(VitalSign::class);
    }

    public function requestedSupplies()
    {
        return $this->hasMany(RequestedSupply::class);
    }

    // Helper methods for age handling
    public function getFormattedAgeAttribute()
    {
        return $this->age;
    }

    public function isNewborn()
    {
        return $this->care_type === 'newborn';
    }

    public function isBaby()
    {
        return $this->care_type === 'baby';
    }

    public function isMaternal()
    {
        return $this->care_type === 'maternal';
    }

    public function isElder()
    {
        return $this->care_type === 'elder';
    }

    // Scope methods for filtering
    public function scopeOfType($query, $type)
    {
        return $query->where('care_type', $type);
    }

    public function scopeByDate($query, $date)
    {
        return $query->whereDate('care_date', $date);
    }

    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('care_date', [$startDate, $endDate]);
    }
}
