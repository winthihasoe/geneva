<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientCaregiverAssignment extends Model
{
    use HasFactory;

    public const LEVELS = ['Skilled', 'Advanced', 'Special Nurse'];

    public const DURATIONS = ['Daily', 'Monthly'];

    public const DUTIES = ['Day', 'Night', '24 hr'];

    protected $fillable = [
        'patient_id',
        'cv_id',
        'assigned_by',
        'start_date',
        'end_date',
        'level',
        'duration',
        'assignment_reason',
        'end_reason',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function cv()
    {
        return $this->belongsTo(CV::class);
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }

    public function notes()
    {
        return $this->hasMany(CaregiverAssignmentNote::class)
            ->orderByDesc('created_at')
            ->orderByDesc('id');
    }

    public function isActive(): bool
    {
        return $this->end_date === null;
    }
}
