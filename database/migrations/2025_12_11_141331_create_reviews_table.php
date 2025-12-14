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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('cv_id')->constrained('c_v_s')->onDelete('cascade');
            $table->tinyInteger('rating')->unsigned(); // 1–5 stars
            $table->json('tags')->nullable();
            $table->text('comment')->nullable();
            $table->timestamps();

            // Prevent duplicate reviews: one patient can review a caregiver only once
            $table->unique(['cv_id', 'patient_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
