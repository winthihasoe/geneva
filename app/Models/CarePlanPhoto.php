<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarePlanPhoto extends Model
{
    use HasFactory;

    public const KIND_CARE_PLAN = 'care_plan';

    public const KIND_CAREGIVER_AGREEMENT = 'caregiver_agreement';

    public const KIND_CAREGIVER_SERVICE_AGREEMENT = 'caregiver_service_agreement';

    public const KINDS = [
        self::KIND_CARE_PLAN,
        self::KIND_CAREGIVER_AGREEMENT,
        self::KIND_CAREGIVER_SERVICE_AGREEMENT,
    ];

    protected $fillable = [
        'patient_id',
        'kind',
        'position',
        'photo_path',
        'uploaded_by',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function toPresentation(): array
    {
        return [
            'id' => $this->id,
            'kind' => $this->kind,
            'url' => route('admin.patient.documents.show', $this),
        ];
    }
}
