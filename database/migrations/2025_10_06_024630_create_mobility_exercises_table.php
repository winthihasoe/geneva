<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mobility_exercises', function (Blueprint $table) {
            $table->id();
            $table->foreignId('care_log_id')->constrained('care_logs')->onDelete('cascade');
            
            $table->time('exercise_time')->nullable();
            $table->string('duration')->nullable(); // "30 minutes", "1 hour"
            $table->text('mobility_assistance_details')->nullable(); // exercises description
            $table->text('notes')->nullable(); // cooperation, discomfort
            
            $table->timestamps();
            
            $table->index('care_log_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mobility_exercises');
    }
};