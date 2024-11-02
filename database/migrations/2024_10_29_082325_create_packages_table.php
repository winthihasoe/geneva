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
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['Live-in', 'Live-out']);
            $table->string('title')->default('Monthly Package');
            $table->string('duty_time')->nullable(); // e.g., "7am-5pm or 8am-6pm"
            $table->string('working_days')->nullable(); // e.g., "6 days/week"
            $table->string('meals_provided')->nullable();
            $table->string('transportation')->nullable();
            $table->timestamps();
        });

        // Insert initial data for packages
        DB::table('packages')->insert([
            // Nanny Service
            ['service_id' => 1, 'type' => 'Live-out', 'title' => 'Monthly Packages', 'duty_time' => '7am-5pm or 8am-6pm', 'working_days' => '6 days/week', 'meals_provided' => 'One time meal needs to be provided', 'transportation' => "Rate are inclusive of transportation fees.", 'created_at' => now(), 'updated_at' => now()],
            ['service_id' => 1, 'type' => 'Live-in', 'title' => 'Monthly Packages', 'duty_time' => 'Flexible', 'working_days' => '6 days/week', 'meals_provided' => 'Three time meal needs to be provided', 'transportation' => "Duty-off hours need to be provided ( E.g, off-duty when the patient sleeps & after the patient has gone to bed)", 'created_at' => now(), 'updated_at' => now()],

            // Newborn Care
            ['service_id' => 2, 'type' => 'Live-out', 'title' => 'Monthly Packages', 'duty_time' => '7am-5pm or 8am-6pm', 'working_days' => '6 days/week', 'meals_provided' => 'One time meal needs to be provided', 'transportation' => "Rate are inclusive of transportation fees.", 'created_at' => now(), 'updated_at' => now()],
            ['service_id' => 2, 'type' => 'Live-in', 'title' => 'Monthly Packages', 'duty_time' => 'Flexible', 'working_days' => '6 days/week', 'meals_provided' => 'Three time meal needs to be provided', 'transportation' => "Duty-off hours need to be provided ( E.g, off-duty when the patient sleeps & after the patient has gone to bed)", 'created_at' => now(), 'updated_at' => now()],

            // Senior Care + Maid Service
            ['service_id' => 3, 'type' => 'Live-out', 'title' => 'Monthly Packages', 'duty_time' => '7am-5pm or 8am-6pm', 'working_days' => '6 days/week', 'meals_provided' => 'Three time meal needs to be provided', 'transportation' => "Rate are inclusive of transportation fees.", 'created_at' => now(), 'updated_at' => now()],
            ['service_id' => 3, 'type' => 'Live-in', 'title' => 'Monthly Packages', 'duty_time' => 'Flexible', 'working_days' => '6 days/week', 'meals_provided' => 'One time meal needs to be provided', 'transportation' => "Duty-off hours need to be provided ( E.g, off-duty when the patient sleeps & after the patient has gone to bed)", 'created_at' => now(), 'updated_at' => now()],

            // Nanny Care + Maid Service
            ['service_id' => 4, 'type' => 'Live-out', 'title' => 'Monthly Packages', 'duty_time' => '7am-5pm or 8am-6pm', 'working_days' => '6 days/week', 'meals_provided' => 'One time meal needs to be provided', 'transportation' => "Rate are inclusive of transportation fees.", 'created_at' => now(), 'updated_at' => now()],
            ['service_id' => 4, 'type' => 'Live-in', 'title' => 'Monthly Packages', 'duty_time' => 'Flexible', 'working_days' => '6 days/week', 'meals_provided' => 'Three time meal needs to be provided', 'transportation' => "Duty-off hours need to be provided ( E.g, off-duty when the patient sleeps & after the patient has gone to bed)", 'created_at' => now(), 'updated_at' => now()],
            
            // Elder Caer
            ['service_id' => 5, 'type' => 'Live-out', 'title' => 'Monthly Packages', 'duty_time' => '7am-5pm or 8am-6pm', 'working_days' => '6 days/week', 'meals_provided' => 'One time meal needs to be provided', 'transportation' => "Rate are inclusive of transportation fees.", 'created_at' => now(), 'updated_at' => now()],
            ['service_id' => 5, 'type' => 'Live-in', 'title' => 'Monthly Packages', 'duty_time' => 'Flexible', 'working_days' => '6 days/week', 'meals_provided' => 'Three time meal needs to be provided', 'transportation' => "Duty-off hours need to be provided ( E.g, off-duty when the patient sleeps & after the patient has gone to bed)", 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};
