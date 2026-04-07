<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('care_log_public_links', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('patient_caregiver_assignment_id')
                ->constrained('patient_caregiver_assignments')
                ->cascadeOnDelete();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->timestamps();

            $table->unique('patient_caregiver_assignment_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('care_log_public_links');
    }
};
