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
        Schema::create('care_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('care_type', ['Baby', 'Elder']);
            $table->date('start_date');
            $table->integer('duration');
            $table->string('preferred_language')->nullable();
            $table->string('service_type')->nullable();
            $table->json('care_recipient_info')->nullable();
            $table->json('contact_info')->nullable();
            $table->json('preferences')->nullable();
            $table->json('services')->nullable();
            $table->json('medical_conditions')->nullable();
            $table->json('schedule')->nullable();
            $table->text('additional_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('care_plans');
    }
};
