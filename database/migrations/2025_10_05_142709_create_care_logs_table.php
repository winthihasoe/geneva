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
        Schema::create('care_logs', function (Blueprint $table) {
            $table->id();
            
            // Foreign keys
            $table->foreignId('cv_id')->nullable()->constrained('c_v_s')->onDelete('set null');
            $table->foreignId('patient_id')->nullable()->constrained('patients')->onDelete('set null');
            $table->foreignId('care_plan_id')->nullable()->constrained('care_plans')->onDelete('set null');

            // Care type (for future use with baby/maternal/elder)
            $table->enum('care_type', ['newborn', 'baby', 'maternal', 'elder'])->default('newborn');
            
            // Basic Information
            $table->date('care_date');
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            
            // Age handling - flexible approach for different age formats
            $table->string('age_display')->nullable(); // For display purposes (e.g., "2 weeks old", "3 months", "85 years")
            $table->integer('age_in_days')->nullable(); // Calculated age in days for sorting/filtering
            $table->enum('age_category', ['newborn', 'infant', 'toddler', 'child', 'adult', 'elderly'])->nullable();
            
            $table->decimal('weight_kg', 5, 2)->nullable(); // Weight in kg (e.g., 3.45 kg)
            $table->decimal('height_cm', 5, 1)->nullable(); // Height in cm (e.g., 52.5 cm)
            
            // Additional Notes/Observations
            $table->text('additional_notes')->nullable();
            
            // Signatures
            $table->string('caregiver_name')->nullable();
            $table->longText('caregiver_signature')->nullable(); // For base64 signature data
            $table->string('guardian_name')->nullable();
            $table->longText('guardian_signature')->nullable();
            $table->text('guardian_comment')->nullable();

            $table->timestamps();
            
            // Index for better query performance
            $table->index(['cv_id', 'care_date']);
            $table->index(['care_type', 'care_date']);
            $table->index(['patient_id', 'care_date']);
            $table->index(['age_category', 'care_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('care_logs');
    }
};
