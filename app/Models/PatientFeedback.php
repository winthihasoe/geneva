<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatientFeedback extends Model
{
    protected $table = 'patient_feedbacks';

    protected $fillable = [
        'patient_id',
        'body',
        'recorded_by',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function recorder()
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }

    public function toPresentation(): array
    {
        return [
            'id' => $this->id,
            'body' => $this->body,
            'staff_name' => $this->recorder->name ?? 'Unknown',
            'recorded_at' => $this->created_at?->format('d-m-Y H:i'),
        ];
    }
}
