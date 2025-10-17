<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('emergency_incidents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('care_log_id')->constrained('care_logs')->onDelete('cascade');

            $table->text('incident_description')->nullable();
            $table->text('actions_taken')->nullable();
            $table->timestamp('incident_time')->nullable();
            $table->enum('severity', ['low', 'medium', 'high', 'critical'])->default('medium')->nullable();
            
            $table->timestamps();
            
            $table->index(['care_log_id', 'severity']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('emergency_incidents');
    }
};