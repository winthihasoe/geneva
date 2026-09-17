<?php

namespace App\Services;

use Carbon\Carbon;

class PatientAgeFromDob
{
    /**
     * Human-readable age from date of birth, by patient type (patients.type).
     * Elder/Maternal: whole years only (e.g. "78").
     * Newborn: days while under one calendar month from birth; whole months thereafter.
     * Baby: whole months until 12 months; years and remaining months after that
     * (e.g. "1 year & 2 months").
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
            'Baby' => self::babyStyle($birth, $today),
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

        return self::monthsLabel((int) $birth->diffInMonths($today));
    }

    private static function babyStyle(Carbon $birth, Carbon $today): string
    {
        $diff = $birth->diff($today);
        $years = $diff->y;
        $months = $diff->m;
        $totalMonths = ($years * 12) + $months;

        if ($totalMonths <= 12) {
            return self::monthsLabel($totalMonths);
        }

        return self::yearsAndMonthsLabel($years, $months);
    }

    private static function monthsLabel(int $months): string
    {
        return $months === 1 ? '1 month' : "{$months} months";
    }

    private static function yearsAndMonthsLabel(int $years, int $months): string
    {
        $yearPart = $years === 1 ? '1 year' : "{$years} years";

        if ($months === 0) {
            return $yearPart;
        }

        $monthPart = $months === 1 ? '1 month' : "{$months} months";

        return "{$yearPart} & {$monthPart}";
    }
}
