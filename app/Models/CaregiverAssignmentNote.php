<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CaregiverAssignmentNote extends Model
{
    protected $table = 'assignment_notes';

    protected $fillable = [
        'patient_caregiver_assignment_id',
        'kind',
        'body',
        'recorded_by',
    ];

    public function assignment()
    {
        return $this->belongsTo(PatientCaregiverAssignment::class, 'patient_caregiver_assignment_id');
    }

    public function recorder()
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }

    public function toPresentation(): array
    {
        return [
            'id' => $this->id,
            'kind' => $this->kind,
            'body' => $this->body,
            'staff_name' => $this->recorder->name ?? 'Unknown',
            'recorded_at' => $this->created_at?->format('d-m-Y H:i'),
        ];
    }
}
