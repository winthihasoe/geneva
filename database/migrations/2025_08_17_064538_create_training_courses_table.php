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
        Schema::create('training_courses', function (Blueprint $table) {
            $table->id();
            // course order number
            $table->unsignedInteger('order')->nullable();
            $table->string('title');
            $table->text('description')->nullable();

            $table->string('instructor')->nullable();
            $table->string('category')->nullable();
            $table->unsignedInteger('price')->default(0);
            $table->integer('duration')->nullable(); // Duration in minutes
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);

            // Course duration
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->time('daily_start_time')->nullable(); // e.g., 09:00
            $table->time('daily_end_time')->nullable();   // e.g., 17:00
            $table->json('schedule_days')->nullable();    // e.g., ["Monday", "Wednesday", "Friday"]

            $table->string('slug')->unique();
            $table->string('image')->nullable();
            $table->string('video_url')->nullable();
            $table->string('level')->nullable(); // e.g., Beginner, Intermediate, Advanced
            $table->string('language')->default('English'); // Default language
            $table->integer('enrollment_count')->default(0); // Number of students enrolled
            $table->string('certificate_url')->nullable(); // URL to the course completion certificate
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('training_courses');
    }
};
