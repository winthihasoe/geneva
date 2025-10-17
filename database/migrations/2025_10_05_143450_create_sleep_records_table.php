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
        Schema::create('sleep_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('care_log_id')->constrained('care_logs')->onDelete('cascade');
            
            // Sleep data from: { timeStarted: "", timeEnded: "", duration: "", notes: "" }
            $table->string('type')->nullable(); // e.g., "morning nap", "afternoon nap", "night sleep"
            $table->time('sleep_start_time')->nullable();
            $table->time('sleep_end_time')->nullable();
            $table->string('duration')->nullable(); // Keep as string for flexibility (e.g., "2 hours", "30 mins")
            $table->string('sleep_quality')->nullable(); // Quality of sleep (e.g., "good", "fair", "poor")
            $table->string('sleep_issues')->nullable();
            $table->text('notes')->nullable();
            
            $table->timestamps();
            
            // Index for better query performance
            $table->index(['care_log_id', 'sleep_start_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sleep_records');
    }
};
