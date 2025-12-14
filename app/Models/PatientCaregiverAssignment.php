<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientCaregiverAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'cv_id',
        'assigned_by',
        'start_date',
        'end_date',
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
}
