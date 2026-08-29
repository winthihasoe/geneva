<?php

namespace Tests\Unit;

use App\Models\User;
use PHPUnit\Framework\TestCase;

class UserRoleTest extends TestCase
{
    public function test_super_admin_is_considered_admin(): void
    {
        $user = new User([
            'is_admin' => false,
            'is_super_admin' => true,
        ]);

        $this->assertTrue($user->isSuperAdmin());
        $this->assertTrue($user->isAdmin());
    }

    public function test_admin_is_not_super_admin(): void
    {
        $user = new User([
            'is_admin' => true,
            'is_super_admin' => false,
        ]);

        $this->assertTrue($user->isAdmin());
        $this->assertFalse($user->isSuperAdmin());
    }

    public function test_regular_user_is_not_admin(): void
    {
        $user = new User([
            'is_admin' => false,
            'is_super_admin' => false,
        ]);

        $this->assertFalse($user->isAdmin());
        $this->assertFalse($user->isSuperAdmin());
    }
}
