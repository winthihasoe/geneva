<?php

namespace App\Services;

use App\Models\Patient;
use InvalidArgumentException;

class PatientCareTypeMapper
{
    /**
     * Map patients.type (display enum) to care_logs.care_type.
     */
    public static function patientTypeToCareType(string $patientType): string
    {
        return match ($patientType) {
            'Elder' => 'elder',
            'Baby' => 'baby',
            'Newborn' => 'newborn',
            'Maternal' => 'maternal',
            default => throw new InvalidArgumentException("Unknown patient type: {$patientType}"),
        };
    }

    public static function careTypeFromPatient(Patient $patient): string
    {
        return self::patientTypeToCareType($patient->type);
    }
}
