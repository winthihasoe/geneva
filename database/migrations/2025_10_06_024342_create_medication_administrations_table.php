<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('medication_administrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('care_log_id')->constrained('care_logs')->onDelete('cascade');
            
            $table->time('administration_time')->nullable();
            $table->string('medication_name')->nullable();
            $table->string('dosage')->nullable();
            $table->string('route')->default('PO')->nullable();
            $table->text('notes')->nullable(); // skipped dose, side effects
            
            $table->timestamps();
            
            $table->index(['care_log_id', 'administration_time']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medication_administrations');
    }
};