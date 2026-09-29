<?php

namespace App\Support;

class CareTypeLabel
{
    public static function display(?string $value): string
    {
        if ($value === null) {
            return '';
        }

        $key = strtolower(trim($value));

        if ($key === '') {
            return '';
        }

        return match ($key) {
            'elder', 'elderly' => 'Elderly',
            'child', 'baby' => 'Baby',
            'newborn' => 'Newborn',
            'maternal' => 'Maternal',
            default => $value,
        };
    }

    public static function patientTypeFromCase(?string $careType): string
    {
        return match (strtolower(trim((string) $careType))) {
            'newborn' => 'Newborn',
            'baby', 'child' => 'Baby',
            'maternal' => 'Maternal',
            default => 'Elder',
        };
    }
}
