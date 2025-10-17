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
        Schema::create('vital_signs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('care_log_id')->constrained('care_logs')->onDelete('cascade');
            
            // Vital Signs data from: { times: [""], temperature: [""], pulseRate: [""], respiratoryRate: [""], bloodPressure: [""] }
            $table->time('measurement_time')->nullable();
            $table->decimal('temperature', 4, 1)->nullable(); // e.g., 98.6°F or 37.0°C
            $table->enum('temperature_unit', ['C', 'F'])->default('C'); // Celsius or Fahrenheit
            $table->unsignedInteger('pulse_rate')->nullable(); // beats per minute
            $table->unsignedInteger('respiratory_rate')->nullable(); // breaths per minute
            
            // Blood Pressure - Separate columns
            $table->unsignedInteger('systolic_pressure')->nullable(); // Top number (e.g., 120)
            $table->unsignedInteger('diastolic_pressure')->nullable(); // Bottom number (e.g., 80)
            $table->decimal('spo2', 5, 2)->nullable(); // Oxygen saturation percentage
            
            $table->text('notes')->nullable(); // Additional observations
            
            $table->timestamps();
            
            // Index for better query performance
            $table->index(['care_log_id', 'measurement_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vital_signs');
    }
};
