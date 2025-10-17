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
        Schema::create('fetal_health_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('care_log_id')->constrained()->onDelete('cascade');
            $table->boolean('fetal_movement_detected')->nullable();
            $table->unsignedInteger('kick_count')->nullable();
            $table->unsignedInteger('fetal_heart_sound')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fetal_health_records');
    }
};
