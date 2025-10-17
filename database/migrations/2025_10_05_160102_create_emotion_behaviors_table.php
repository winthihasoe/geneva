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
        Schema::create('emotion_behaviors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('care_log_id')->constrained('care_logs')->onDelete('cascade');
            
            // Health and Behavior data from: { mood: "", symptoms: "", medications: "" }
            $table->text('mood')->nullable();
            $table->text('behavior')->nullable(); // will include in maternal and elderly care logs
            $table->text('symptoms')->nullable();
            $table->text('medications')->nullable();
            $table->text('action_taken')->nullable();
            
            $table->timestamps();
            
            // Index for better query performance
            $table->index('care_log_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emotion_behaviors');
    }
};
