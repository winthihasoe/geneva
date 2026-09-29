<?php

namespace Tests\Unit;

use App\Support\CareTypeLabel;
use App\Support\PerformanceRecordParser;
use PHPUnit\Framework\TestCase;

class CareTypeLabelTest extends TestCase
{
    public function test_elder_values_display_as_elderly(): void
    {
        $this->assertSame('Elderly', CareTypeLabel::display('Elder'));
        $this->assertSame('Elderly', CareTypeLabel::display('elder'));
        $this->assertSame('Elderly', CareTypeLabel::display('Elderly'));
    }

    public function test_child_and_baby_display_as_baby(): void
    {
        $this->assertSame('Baby', CareTypeLabel::display('child'));
        $this->assertSame('Baby', CareTypeLabel::display('Child'));
        $this->assertSame('Baby', CareTypeLabel::display('Baby'));
    }

    public function test_newborn_and_maternal_keep_their_labels(): void
    {
        $this->assertSame('Newborn', CareTypeLabel::display('newborn'));
        $this->assertSame('Maternal', CareTypeLabel::display('Maternal'));
    }

    public function test_patient_type_from_case(): void
    {
        $this->assertSame('Newborn', CareTypeLabel::patientTypeFromCase('newborn'));
        $this->assertSame('Baby', CareTypeLabel::patientTypeFromCase('baby'));
        $this->assertSame('Baby', CareTypeLabel::patientTypeFromCase('child'));
        $this->assertSame('Elder', CareTypeLabel::patientTypeFromCase('elder'));
        $this->assertSame('Maternal', CareTypeLabel::patientTypeFromCase('maternal'));
        $this->assertSame('Elder', CareTypeLabel::patientTypeFromCase(null));
    }

    public function test_parser_recognizes_maternal_and_keeps_child(): void
    {
        $this->assertSame('maternal', PerformanceRecordParser::parseCareType('Maternal'));
        $this->assertSame('child', PerformanceRecordParser::parseCareType('Child'));
        $this->assertSame('elder', PerformanceRecordParser::parseCareType('Elderly'));
    }
}
