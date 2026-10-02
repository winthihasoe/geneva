<?php

namespace Tests\Unit;

use App\Support\TypedNameConfirmation;
use PHPUnit\Framework\TestCase;

class TypedNameConfirmationTest extends TestCase
{
    public function test_exact_name_matches(): void
    {
        $this->assertTrue(TypedNameConfirmation::matches('Daw Hla', 'Daw Hla'));
        $this->assertTrue(TypedNameConfirmation::matches('  Daw Hla  ', 'Daw Hla'));
        $this->assertTrue(TypedNameConfirmation::matches('Daw Hla', '  Daw Hla  '));
    }

    public function test_different_name_does_not_match(): void
    {
        $this->assertFalse(TypedNameConfirmation::matches('Daw Hla', 'Daw Mya'));
        $this->assertFalse(TypedNameConfirmation::matches('Daw Hla', 'daw hla'));
    }

    public function test_blank_name_cannot_be_confirmed(): void
    {
        $this->assertFalse(TypedNameConfirmation::matches('', ' '));
        $this->assertFalse(TypedNameConfirmation::matches(null, ''));
        $this->assertFalse(TypedNameConfirmation::matches('Daw Hla', null));
        $this->assertFalse(TypedNameConfirmation::matches('Daw Hla', ['Daw Hla']));
    }

    public function test_rejection_message_names_the_field(): void
    {
        $this->assertSame(
            'Type the candidate name exactly to confirm deletion.',
            TypedNameConfirmation::rejectionMessage('candidate name')
        );
    }
}
