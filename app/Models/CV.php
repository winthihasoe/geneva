<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


class CV extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'slug',
        'ha_id',
    
        // Personal Info
        'full_name',
        'nickname',
        'date_of_birth',
        'gender',
        'height',
        'weight',
        'place_of_birth',
        'nationality',
        'other_nationality',
        'religion',
        'personality',
        'language',
        'hobbies',
        'other_hobbies',
        'wears_glasses',
        'has_tattoo',
        'habits',
        'other_habits',
    
        // Contact Info
        'email',
        'emergency_contact',
        'line',
        'phone',
        'phone_verify_at',
        'current_address',
        'residential_address',
    
        // Education & Certificate
        'education_level',
        'caregiver_qualification',
    
        // Family and Marital Status
        'marital_status',
        'number_of_children',
        'number_of_siblings',
        'current_location',
        'worked_in_thailand',
    
        'introduction',
        'nursing_skills_for_elder',
        'nursing_skills_for_child',
        'types_of_patients_handled',
        'other_types_of_patients_handled',
        'types_of_babies_handled',
        'other_types_of_babies_handled',
    
        // Medical History
        'past_illnesses',
        'other_illness',
        'allergies',
        'physical_disability',
        'dietary_restrictions',
        'other_dietary_restrictions',
        'food_handling',
        'other_food_handling',
    
        // Required Documents
        'profile_photo',
        'passport',
        'passport_expiry_date',
        'passport_number',
        'passport_type',
        'visa_type',
        'visa_stamp',
        'citizenship_certificate',
        'family_member_record',
    
        // Experience Records
        'newborn_experience_years',
        'nanny_experience_years',
        'elder_experience_years',
        'detail_experience',
    
        // Caregiver Level
        'level',
    
        // Care Details
        'gender_of_patient',
        'services',
        'maid_service',
        'package_duration',
        'package',
        'duty',
        'service_area',
    
        // Other Information
        'approved_by',
        'is_approved',
        'approved_at',
        'current_step',
        'status',
        'agree_to_terms', 
        'training_or_assessment'
    ];
    

    public function vaccinations()
    {
        return $this->hasMany(Vaccination::class, 'cv_id');
    }

    protected $casts = [
        'language' => 'array',
        'hobbies' => 'array',
        'habits' => 'array',
        'nursing_skills_for_elder' => 'array',
        'nursing_skills_for_child' => 'array',
        'types_of_patients_handled' => 'array',
        'types_of_babies_handled' => 'array',
        'past_illnesses' => 'array',
        'dietary_restrictions' => 'array',
        'food_handling' => 'array',
        'services' => 'array',
        'package_duration' => 'array',
        'package' => 'array',
        'duty' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            // Generate a unique ha_id for the new CV record
             \Log::info('Generating ha_id for new CV');

            $model->ha_id = self::generateHaId();

            // Ensure the slug is unique
            $model->slug = Str::uuid()->toString();
        });
    }

    // The generateHaId method remains the same as previously defined
    private static function generateHaId()
    {
        // Get the current month and year in MMYY format
        $prefix = now()->format('my'); // 'my' generates 'MMYY' format
        \Log::info('generateHaId: prefix', ['prefix' => $prefix]);

        // Find the last ha_id for the current month and year
        // Use lockForUpdate to prevent race conditions
        $lastHaId = self::where('ha_id', 'like', "{$prefix}%")
            ->lockForUpdate()
            ->orderBy('ha_id', 'desc')
            ->first();
        \Log::info('generateHaId: lastHaId', ['lastHaId' => $lastHaId ? $lastHaId->ha_id : null]);

        // Determine the serial number
        if ($lastHaId) {
            // Extract the numeric part after the prefix and increment it
            $lastSerial = (int) substr($lastHaId->ha_id, 4); // Get the serial part
            $newSerial = str_pad($lastSerial + 1, 2, '0', STR_PAD_LEFT);
            \Log::info('generateHaId: lastSerial and newSerial', [
                'lastSerial' => $lastSerial,
                'newSerial' => $newSerial
            ]);
        } else {
            // Start from 01 if no record exists for the current month and year
            $newSerial = '01';
            \Log::info('generateHaId: No previous ha_id, starting at 01');
        }

        // Combine the prefix and the serial
        $haId = $prefix . $newSerial;
        \Log::info('generateHaId: generated ha_id', ['ha_id' => $haId]);
        return $haId;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class, 'cv_id');
    }
    
    public function experiences()
    {
        return $this->hasMany(Experience::class, 'cv_id');
    }
}
