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
        Schema::create('diaper_changes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('care_log_id')->constrained('care_logs')->onDelete('cascade');
            
            // Diaper change data from: { time: "", content: "", notes: "" }
            $table->time('change_time')->nullable();
            $table->enum('diaper_content', ['Wet', 'Dirty', 'Both'])->nullable();
            $table->text('notes')->nullable();
            
            $table->timestamps();
            
            // Index for better query performance
            $table->index(['care_log_id', 'change_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diaper_changes');
    }
};
