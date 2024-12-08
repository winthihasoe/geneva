<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewbornBabyCareLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'log_date',
        'weight',
        'height',
        'feeding',
        'diaper_changes',
        'sleep',
        'activities',
        'hygiene_grooming',
        'mood_behavior',
        'symptoms',
        'medications',
        'vital_signs',
        'additional_notes',
        'requested_supplies',
        'parent_signature',
        'parent_comment',
        'nanny_signature',
        'nanny_name',
    ];

    protected $casts = [
        'feeding' => 'array',
        'diaper_changes' => 'array',
        'sleep' => 'array',
        'activities' => 'array',
        'hygiene_grooming' => 'array',
        'vital_signs' => 'array',
        'requested_supplies' => 'array',
    ];

    /**
     * Define the relationship with the Patient model.
     */
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}
