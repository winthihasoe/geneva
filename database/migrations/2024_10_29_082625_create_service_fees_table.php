<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_fees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('package_duration_id')->constrained()->onDelete('cascade');
            $table->integer('fee'); 
            $table->timestamps();
        });

        // Insert initial data for service fees
        DB::table('service_fees')->insert([
            // Nanny Service - Live-out
            ['package_duration_id' => 1, 'fee' => 6000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 2, 'fee' => 9000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 3, 'fee' => 13000, 'created_at' => now(), 'updated_at' => now()],

            // Nanny Service - Live-in
            ['package_duration_id' => 4, 'fee' => 7000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 5, 'fee' => 11000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 6, 'fee' => 17000, 'created_at' => now(), 'updated_at' => now()],

            // Newborn Care - Live-out
            ['package_duration_id' => 7, 'fee' => 7000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 8, 'fee' => 10000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 9, 'fee' => 15000, 'created_at' => now(), 'updated_at' => now()],

            // Newborn Care - Live-in
            ['package_duration_id' => 10, 'fee' => 7000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 11, 'fee' => 11000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 12, 'fee' => 19000, 'created_at' => now(), 'updated_at' => now()],

            // Senior Care + Maid Service - Live-out
            ['package_duration_id' => 13, 'fee' => 7000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 14, 'fee' => 10000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 15, 'fee' => 15000, 'created_at' => now(), 'updated_at' => now()],

            // Senior Care + Maid Service - Live-in
            ['package_duration_id' => 16, 'fee' => 8000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 17, 'fee' => 12000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 18, 'fee' => 17000, 'created_at' => now(), 'updated_at' => now()],

            // Nanny Care + Maid Service - Live-out
            ['package_duration_id' => 19, 'fee' => 7000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 20, 'fee' => 10000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 21, 'fee' => 15000, 'created_at' => now(), 'updated_at' => now()],

            // Nanny Care + Maid Service - Live-in
            ['package_duration_id' => 22, 'fee' => 8000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 23, 'fee' => 12000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 24, 'fee' => 17000, 'created_at' => now(), 'updated_at' => now()],

            // Elder Care - Live-out
            ['package_duration_id' => 25, 'fee' => 6000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 26, 'fee' => 9000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 27, 'fee' => 13000, 'created_at' => now(), 'updated_at' => now()],

            // Elder Care - Live-in
            ['package_duration_id' => 28, 'fee' => 7000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 29, 'fee' => 11000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 30, 'fee' => 17000, 'created_at' => now(), 'updated_at' => now()],
 
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_fees');
    }
};
