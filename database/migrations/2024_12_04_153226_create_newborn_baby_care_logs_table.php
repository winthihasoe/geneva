<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('newborn_baby_care_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained('patients')->onDelete('cascade'); // Link to patient/baby details
            $table->date('log_date'); // Date of care log

            // Baby Details
            $table->float('weight')->nullable(); // Weight in pounds or kilograms
            $table->float('height')->nullable(); // Height in inches or centimeters

            // Feeding Section
            $table->json('feeding')->nullable(); // JSON: time, type, amount, notes

            // Diaper Changes Section
            $table->json('diaper_changes')->nullable(); // JSON: time, type (wet/dirty/both), notes

            // Sleep Section
            $table->json('sleep')->nullable(); // JSON: start time, end time, duration, notes

            // Activities Section
            $table->json('activities')->nullable(); // JSON: time, activity, duration, description

            // Hygiene & Grooming Section
            $table->json('hygiene_grooming')->nullable(); // JSON: time, activity, products used, notes

            // Health and Behavior Section
            $table->text('mood_behavior')->nullable(); // Free-text field for mood/behavior observations
            $table->text('symptoms')->nullable(); // Free-text field for symptoms
            $table->text('medications')->nullable(); // Free-text field for medications given
            $table->json('vital_signs')->nullable(); // JSON: temperature, pulse rate, respiratory rate at different times

            // Additional Notes/Observations
            $table->text('additional_notes')->nullable(); // Free-text field for additional observations

            // Requested Supplies
            $table->json('requested_supplies')->nullable(); // JSON: item, quantity, purpose, priority

            // Signatures
            $table->string('parent_signature')->nullable(); // Parent/Guardian signature
            $table->text('parent_comment')->nullable(); // Parent/Guardian comment
            $table->string('nanny_signature')->nullable(); // Nanny signature
            $table->string('nanny_name')->nullable(); // Nanny name
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('newborn_baby_care_logs');
    }
};
