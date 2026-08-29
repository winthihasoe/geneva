<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class PromoteSuperAdmin extends Command
{
    protected $signature = 'user:promote-super-admin {email : The email of the user to promote}';

    protected $description = 'Grant super admin access to a user so they can manage roles';

    public function handle(): int
    {
        $email = $this->argument('email');
        $user = User::where('email', $email)->first();

        if (! $user) {
            $this->error("No user found with email {$email}.");

            return self::FAILURE;
        }

        $user->update([
            'is_super_admin' => true,
        ]);

        $this->info("{$user->name} ({$user->email}) is now a super admin.");

        return self::SUCCESS;
    }
}
