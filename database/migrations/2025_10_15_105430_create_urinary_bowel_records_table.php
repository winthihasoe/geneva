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
        Schema::create('urinary_bowel_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('care_log_id')->constrained('care_logs')->onDelete('cascade');
            $table->time('record_time')->nullable();
            // Urinary
            $table->string('urine_frequency')->nullable(); // e.g., 'Normal', 'Increased', 'Decreased'
            $table->boolean('blood_in_urine')->default(false)->nullable();
            $table->boolean('pain_discomfort_urination')->default(false)->nullable();
            $table->boolean('discharge')->default(false)->nullable();

            // Bowel
            $table->string('bowel_movement_frequency')->nullable(); // e.g., 'Daily', 'Every 2 days', 'Weekly'
            $table->boolean('blood_in_stool')->default(false)->nullable();
            $table->boolean('pain_discomfort_abdomen')->default(false)->nullable();
            $table->text('other_symptoms')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('urinary_bowel_records');
    }
};
