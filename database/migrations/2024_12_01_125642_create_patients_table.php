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
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('pt_id', 10)->unique()->nullable();
            $table->string('slug')->unique()->nullable()->index();
            $table->enum('type', ['Elder', 'Baby', 'Newborn']); // 'Adult', 'Baby', 'Newborn'
            
            $table->string('first_name', 100);
            $table->string('last_name', 100)->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['Male', 'Female', 'Other']);
            $table->float('weight_kg')->nullable();
            $table->float('height_cm')->nullable();
            $table->enum('blood_type', ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])->nullable();
            $table->text('allergies')->nullable();
            $table->text('medical_conditions')->nullable();
            $table->string('emergency_contact_name', 100)->nullable();
            $table->string('emergency_contact_relationship', 50)->nullable();
            $table->string('emergency_contact_phone', 15)->nullable();
            $table->text('address')->nullable();
            $table->text('notes')->nullable();
            $table->string('created_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
