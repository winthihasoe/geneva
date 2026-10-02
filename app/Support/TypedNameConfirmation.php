<?php

namespace App\Support;

class TypedNameConfirmation
{
    public static function matches(?string $expected, mixed $typed): bool
    {
        if (! is_string($typed)) {
            return false;
        }

        $expectedName = trim((string) $expected);
        $typedName = trim($typed);

        return $expectedName !== '' && $expectedName === $typedName;
    }

    public static function rejectionMessage(string $nameKind): string
    {
        return "Type the {$nameKind} exactly to confirm deletion.";
    }
}
