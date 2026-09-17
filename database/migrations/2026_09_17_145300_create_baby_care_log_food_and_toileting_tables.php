<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('food_offered_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('care_log_id')->constrained('care_logs')->onDelete('cascade');
            $table->string('meal_time')->nullable();
            $table->string('food_offered')->nullable();
            $table->string('quantity')->nullable();
            $table->string('texture')->nullable();
            $table->text('reaction_notes')->nullable();
            $table->timestamps();

            $table->index('care_log_id');
        });

        Schema::create('toileting_training_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('care_log_id')->constrained('care_logs')->onDelete('cascade');
            $table->time('time')->nullable();
            $table->string('toilet_attempt')->nullable();
            $table->string('result')->nullable();
            $table->string('type')->nullable();
            $table->text('reaction')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['care_log_id', 'time']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('toileting_training_records');
        Schema::dropIfExists('food_offered_records');
    }
};
