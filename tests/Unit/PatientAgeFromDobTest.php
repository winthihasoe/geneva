<?php

namespace Tests\Unit;

use App\Services\PatientAgeFromDob;
use Carbon\Carbon;
use PHPUnit\Framework\TestCase;

class PatientAgeFromDobTest extends TestCase
{
    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    public function test_baby_under_one_year_is_shown_in_months(): void
    {
        Carbon::setTestNow(Carbon::parse('2026-09-17')->startOfDay());

        $this->assertSame(
            '11 months',
            PatientAgeFromDob::ageDisplay('2025-10-17', 'Baby')
        );
    }

    public function test_baby_at_twelve_months_stays_in_months(): void
    {
        Carbon::setTestNow(Carbon::parse('2026-09-17')->startOfDay());

        $this->assertSame(
            '12 months',
            PatientAgeFromDob::ageDisplay('2025-09-17', 'Baby')
        );
    }

    public function test_baby_over_twelve_months_is_shown_in_years_and_months(): void
    {
        Carbon::setTestNow(Carbon::parse('2026-09-17')->startOfDay());

        $this->assertSame(
            '1 year & 2 months',
            PatientAgeFromDob::ageDisplay('2025-07-17', 'Baby')
        );
    }

    public function test_baby_exact_years_omits_zero_months(): void
    {
        Carbon::setTestNow(Carbon::parse('2026-09-17')->startOfDay());

        $this->assertSame(
            '2 years',
            PatientAgeFromDob::ageDisplay('2024-09-17', 'Baby')
        );
    }
}
