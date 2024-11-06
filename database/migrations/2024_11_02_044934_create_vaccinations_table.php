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
        Schema::create('vaccinations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cv_id')->constrained('c_v_s')->onDelete('cascade');
            $table->string('vaccine_name');
            $table->date('vaccination_date');
            $table->date('next_due_date')->nullable();
            $table->string('dose_number')->nullable();
            $table->string('status')->default('completed');
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vaccinations');
    }
};
