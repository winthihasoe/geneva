<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blood_glucose_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('care_log_id')->constrained('care_logs')->onDelete('cascade');

            $table->time('measurement_time')->nullable();
            $table->decimal('glucose_level', 5, 2)->nullable(); // mg/dL or mmol/L
            $table->enum('timing', ['fasting', 'random', '2hpp'])->nullable(); // 2HPP = 2 hours post prandial
            $table->text('notes')->nullable();
            
            $table->timestamps();
            
            $table->index(['care_log_id', 'measurement_time']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blood_glucose_records');
    }
};