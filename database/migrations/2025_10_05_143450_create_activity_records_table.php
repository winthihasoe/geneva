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
        Schema::create('activity_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('care_log_id')->constrained('care_logs')->onDelete('cascade');
            
            // Activity data from: { time: "", activity: "", duration: "", details: "" }
            $table->time('activity_time')->nullable();
            $table->string('activity_type')->nullable(); // Tummy time, Play, Bath, etc.
            $table->string('duration')->nullable(); // Duration as string for flexibility
            $table->text('notes')->nullable(); // Activity details/notes
            
            $table->timestamps();
            
            // Index for better query performance
            $table->index(['care_log_id', 'activity_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_records');
    }
};
