<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarePlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'care_type',
        'start_date',
        'duration',
        'preferred_language',
        'service_type',
        'care_recipient_info',
        'contact_info',
        'preferences',
        'services',
        'medical_conditions',
        'schedule',
        'additional_notes',
        'is_read',
        'current_step',
    ];

    protected $casts = [
        'care_recipient_info' => 'array',
        'contact_info' => 'array',
        'preferences' => 'array',
        'services' => 'array',
        'medical_conditions' => 'array',
        'schedule' => 'array',
    ];

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
