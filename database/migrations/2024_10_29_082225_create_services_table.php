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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "Newborn Care"
            $table->text('description')->nullable();
            $table->string('age_range')->nullable(); // e.g., "Baby's Age Day 1 - 1 year"
            $table->timestamps();
        });

        // Insert initial data for services
        DB::table('services')->insert([
            ['name' => 'Nanny Service', 'description' => "Service for child care, age 1 to 10 years", 'age_range' => "Baby's Age 1-10 years", 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Newborn Care', 'description' => "Care service for newborns, day 1 to 1 year", 'age_range' => "Baby's Age Day 1 - 1 year", 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Elder Care + Maid Service', 'description' => "Service for senior care and household assistance", 'age_range' => "Elderly", 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Nanny Care + Maid Service', 'description' => "Combined service for nanny care and maid services", 'age_range' => "Baby's Age 1-10 years", 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Elder Care', 'description' => "Service for elder care", 'age_range' => "Elderly", 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
