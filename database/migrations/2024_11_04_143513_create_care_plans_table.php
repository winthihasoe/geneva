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
            $table->integer('duration'); // record in days
            $table->string('preferred_language')->nullable();
            $table->string('service_type')->nullable(); // Basic Care, Basic + Medical Care
            $table->json('care_recipient_info')->nullable(); // Baby or Patient info
            $table->json('contact_info')->nullable(); // Gurdian info
            $table->json('preferences')->nullable(); 
            $table->json('services')->nullable(); // Needed nursing skills
            $table->json('medical_conditions')->nullable(); 
            $table->json('schedule')->nullable(); // day time or 24 hours 
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
