<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CarePlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'uuid',
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
        'other_medical_conditions',
        'mobilities',
        'memory',
        'alertness',
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

    // Auto-generate UUID when creating
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = Str::uuid();
            }
        });
    }


    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function interviews()
    {
        return $this->hasMany(Interview::class);
    }
}
