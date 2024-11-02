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
        Schema::create('package_durations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('package_id')->constrained()->onDelete('cascade');
            $table->string('duration')->nullable(); // e.g., "3-month"
            $table->string('replacement_policy')->nullable(); // e.g., "5 times replacement"
            $table->timestamps();
        });

        // Insert initial data for package durations
        DB::table('package_durations')->insert([
            // Nanny Service - Live-out
            ['package_id' => 1, 'duration' => '3-month', 'replacement_policy' => '5 times replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 1, 'duration' => '6-month', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 1, 'duration' => '1-year', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],

            // Nanny Service - Live-in
            ['package_id' => 2, 'duration' => '3-month', 'replacement_policy' => '5 times replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 2, 'duration' => '6-month', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 2, 'duration' => '1-year', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],

            // Newborn Care - Live-out
            ['package_id' => 3, 'duration' => '3-month', 'replacement_policy' => '5 times replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 3, 'duration' => '6-month', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 3, 'duration' => '1-year', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],

            // Newborn Care - Live-in
            ['package_id' => 4, 'duration' => '3-month', 'replacement_policy' => '5 times replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 4, 'duration' => '6-month', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 4, 'duration' => '1-year', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],

            // Senior Care + Maid Service - Live-out
            ['package_id' => 5, 'duration' => '3-month', 'replacement_policy' => '5 times replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 5, 'duration' => '6-month', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 5, 'duration' => '1-year', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],

            // Senior Care + Maid Service - Live-in
            ['package_id' => 6, 'duration' => '3-month', 'replacement_policy' => '5 times replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 6, 'duration' => '6-month', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 6, 'duration' => '1-year', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],

            // Nanny Care + Maid Service - Live-out
            ['package_id' => 7, 'duration' => '3-month', 'replacement_policy' => '5 times replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 7, 'duration' => '6-month', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 7, 'duration' => '1-year', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],

            // Nanny Care + Maid Service - Live-in
            ['package_id' => 8, 'duration' => '3-month', 'replacement_policy' => '5 times replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 8, 'duration' => '6-month', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 8, 'duration' => '1-year', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],
         
            // Elder care - Live-out
            ['package_id' => 9, 'duration' => '3-month', 'replacement_policy' => '5 times replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 9, 'duration' => '6-month', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 9, 'duration' => '1-year', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],

            // Elder care - Live-in
            ['package_id' => 10, 'duration' => '3-month', 'replacement_policy' => '5 times replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 10, 'duration' => '6-month', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],
            ['package_id' => 10, 'duration' => '1-year', 'replacement_policy' => 'unlimited replacement', 'created_at' => now(), 'updated_at' => now()],

        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('package_durations');
    }
};
