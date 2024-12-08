<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'pt_id',
        'slug',
        'type',
        'first_name',
        'last_name',
        'date_of_birth',
        'gender',
        'weight_kg',
        'height_cm',
        'blood_type',
        'allergies',
        'medical_conditions',
        'emergency_contact_name',
        'emergency_contact_relationship',
        'emergency_contact_phone',
        'address',
        'notes',
        'created_by',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            // Generate a unique pt_id for the new CV record
            $model->pt_id = self::generatePtId();

            // Ensure the slug is unique
            $model->slug = Str::uuid()->toString();
        });
    }

    // The generatePtId method remains the same as previously defined
    private static function generatePtId()
    {
        // Get the current month and year in MMYY format
        $suffix = now()->format('my'); // 'my' generates 'MMYY' format

        // Find the last pt_id for the current month and year
        $lastPtId = self::where('pt_id', 'like', "%{$suffix}")
            ->orderBy('pt_id', 'desc')
            ->first();

        // Determine the serial number
        if ($lastPtId) {
            // Extract the numeric part before the suffix and increment it
            $lastSerial = (int) substr($lastPtId->pt_id, 0, 2); // Get the serial part
            $newSerial = str_pad($lastSerial + 1, 2, '0', STR_PAD_LEFT); // Use 3 digits
        } else {
            // Start from 001 if no record exists for the current month and year
            $newSerial = '01';
        }

        // Combine the serial and the suffix
        return $newSerial . $suffix;
    }

    public function newbornBabyCareLogs()
    {
        return $this->hasMany(NewbornBabyCareLog::class);
    }
    
    /**
     * Relationship: A patient has many care plans.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function carePlans()
    {
        return $this->hasMany(CarePlan::class);
    }

    public function carePlanPhotos()
    {
        return $this->hasMany(CarePlanPhoto::class);
    }
}
