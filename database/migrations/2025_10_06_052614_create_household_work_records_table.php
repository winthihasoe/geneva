<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('household_work_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('care_log_id')->constrained('care_logs')->onDelete('cascade');
            
            $table->text('household_work')->nullable();
            $table->time('start_time')->nullable();
            $table->string('duration')->nullable();
            $table->text('notes')->nullable();
            
            $table->timestamps();
            
            $table->index('care_log_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('household_work_records');
    }
};