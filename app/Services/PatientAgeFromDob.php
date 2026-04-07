<?php

namespace App\Services;

use Carbon\Carbon;

class PatientAgeFromDob
{
    /**
     * Human-readable age from date of birth, by patient type (patients.type).
     * Elder/Maternal: whole years only (e.g. "78").
     * Newborn: days while under one calendar month from birth; whole months thereafter.
     * Baby: whole months.
     */
    public static function ageDisplay(?string $dateOfBirth, string $patientType): ?string
    {
        if ($dateOfBirth === null || $dateOfBirth === '') {
            return null;
        }

        $birth = Carbon::parse($dateOfBirth)->startOfDay();
        $today = Carbon::now()->startOfDay();

        if ($birth->greaterThan($today)) {
            return '0';
        }

        return match ($patientType) {
            'Elder', 'Maternal' => (string) $birth->diffInYears($today),
            'Newborn' => self::newbornStyle($birth, $today),
            'Baby' => self::monthsLabel($birth->diffInMonths($today)),
            default => (string) $birth->diffInYears($today),
        };
    }

    private static function newbornStyle(Carbon $birth, Carbon $today): string
    {
        $oneMonthAfterBirth = $birth->copy()->addMonth();

        if ($today->lt($oneMonthAfterBirth)) {
            $days = $birth->diffInDays($today);

            return $days === 1 ? '1 day' : "{$days} days";
        }

        return self::monthsLabel($birth->diffInMonths($today));
    }

    private static function monthsLabel(int $months): string
    {
        return $months === 1 ? '1 month' : "{$months} months";
    }
}
