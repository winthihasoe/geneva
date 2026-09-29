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
        'service_area',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
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
        return $newSerial.$suffix;
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
        return $this->hasMany(CarePlanPhoto::class)
            ->orderBy('position')
            ->orderBy('id');
    }

    public function caregiverAssignments()
    {
        return $this->hasMany(PatientCaregiverAssignment::class);
    }

    public function feedbackEntries()
    {
        return $this->hasMany(PatientFeedback::class)
            ->orderByDesc('created_at')
            ->orderByDesc('id');
    }

    public function currentCaregiver()
    {
        return $this->hasOne(PatientCaregiverAssignment::class)
            ->whereNull('end_date');
    }

    public function careLogs()
    {
        return $this->hasMany(CareLog::class);
    }

    public function caseRecords()
    {
        return $this->hasMany(CaseRecord::class);
    }

    public function scopeMatchingCase($query, CaseRecord $case)
    {
        $name = trim((string) $case->name);
        $digits = preg_replace('/\D+/', '', (string) $case->phone) ?? '';

        if ($name === '' && strlen($digits) < 4) {
            return $query->whereRaw('1 = 0');
        }

        return $query->where(function ($inner) use ($name, $digits) {
            if ($name !== '') {
                $like = '%'.$name.'%';
                $inner->where('first_name', 'like', $like)
                    ->orWhere('last_name', 'like', $like);
            }

            if (strlen($digits) >= 4) {
                $method = $name === '' ? 'whereRaw' : 'orWhereRaw';
                $inner->{$method}(
                    "REPLACE(REPLACE(REPLACE(REPLACE(COALESCE(emergency_contact_phone, ''), ' ', ''), '-', ''), CHAR(10), ''), CHAR(13), '') LIKE ?",
                    ['%'.$digits.'%']
                );
            }
        });
    }

    public function scopeMatchingSearch($query, string $search)
    {
        $term = trim($search);
        $digits = preg_replace('/\D+/', '', $term) ?? '';

        if ($term === '' && strlen($digits) < 4) {
            return $query->whereRaw('1 = 0');
        }

        $like = '%'.$term.'%';

        return $query->where(function ($inner) use ($like, $term, $digits) {
            if ($term !== '') {
                $inner->where('first_name', 'like', $like)
                    ->orWhere('last_name', 'like', $like)
                    ->orWhere('pt_id', 'like', $like);
            }

            if (strlen($digits) >= 4) {
                $method = $term !== '' ? 'orWhereRaw' : 'whereRaw';
                $inner->{$method}(
                    "REPLACE(REPLACE(REPLACE(REPLACE(COALESCE(emergency_contact_phone, ''), ' ', ''), '-', ''), CHAR(10), ''), CHAR(13), '') LIKE ?",
                    ['%'.$digits.'%']
                );
            }
        });
    }
}
