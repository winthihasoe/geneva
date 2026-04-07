<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $driver = DB::getDriverName();
        if ($driver === 'mysql') {
            DB::statement("ALTER TABLE patients MODIFY COLUMN type ENUM('Elder', 'Baby', 'Newborn', 'Maternal') NOT NULL");
        } elseif ($driver === 'sqlite') {
            // SQLite has no native ENUM; skip if using sqlite for tests
        }
    }

    public function down(): void
    {
        $driver = DB::getDriverName();
        if ($driver === 'mysql') {
            DB::statement("ALTER TABLE patients MODIFY COLUMN type ENUM('Elder', 'Baby', 'Newborn') NOT NULL");
        }
    }
};
