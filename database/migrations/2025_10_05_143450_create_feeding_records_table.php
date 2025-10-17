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
        Schema::create('feeding_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('care_log_id')->constrained('care_logs')->onDelete('cascade');
            
            // Feeding data from: { time: "", type: "", amount: "", notes: "" }
            $table->time('feeding_time')->nullable();
            $table->string('feeding_type')->nullable(); // Breastmilk, Formula, Weaning diet
            
            // Amount with unit standardization
            $table->decimal('amount', 8, 2)->nullable(); // Numeric amount (e.g., 120.50)
            $table->enum('amount_unit', ['ml', 'oz', 'l'])->default('oz'); // Unit of measurement
            
            $table->text('notes')->nullable();
            
            $table->timestamps();
            
            // Index for better query performance
            $table->index(['care_log_id', 'feeding_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feeding_records');
    }
};
