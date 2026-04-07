<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CareLogPublicLink extends Model
{
    protected $fillable = [
        'uuid',
        'patient_caregiver_assignment_id',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'uuid' => 'string',
        ];
    }

    public function assignment(): BelongsTo
    {
        return $this->belongsTo(PatientCaregiverAssignment::class, 'patient_caregiver_assignment_id');
    }

    public function createdByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
