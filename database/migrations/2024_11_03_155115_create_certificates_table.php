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
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cv_id')->constrained('c_v_s')->onDelete('cascade'); // Foreign key for CV relationship
            $table->string('training_center_name');
            $table->string('course')->nullable();
            $table->date('start_date');
            $table->unsignedInteger('duration')->comment('Duration in months'); // In months
            $table->string('certificate_photo')->nullable(); // Image path
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
