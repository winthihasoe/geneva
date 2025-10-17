<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('intake_output_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('care_log_id')->constrained('care_logs')->onDelete('cascade');
            
            // Intake Records
            $table->string('meal_type')->nullable();
            $table->time('meal_time')->nullable();
            $table->json('food_items')->nullable(); // ["item1", "item2", "item3", "item4"]
            $table->decimal('amount', 8, 2)->nullable(); 
            $table->enum('amount_unit', ['ml', 'oz', 'l'])->default('oz')->nullable(); 
            $table->boolean('assistance_needed')->default(false)->nullable();
            $table->text('intake_notes')->nullable(); // preferences, issues
            
            // Hydration
            $table->decimal('fluid_intake', 8, 2)->nullable(); 
            $table->enum('fluid_intake_unit', ['l', 'ml', 'cup'])->default('l')->nullable(); 
            $table->string('dehydration_signs')->nullable();
            $table->string('other_dehydration_signs')->nullable();
            
            // Output Records
            $table->time('output_time')->nullable();
            $table->decimal('urine_volume', 8, 2)->nullable(); 
            $table->enum('urine_volume_unit', ['l', 'ml'])->default('l')->nullable(); 
            $table->string('urine_color')->nullable();
            $table->enum('bowel_movement', ['yes', 'no'])->nullable();
            $table->string('bowel_consistency')->nullable();
            $table->text('output_notes')->nullable();
            
            $table->timestamps();
            
            // Updated index to include the new structure
            $table->index(['care_log_id', 'meal_type', 'meal_time']);
            $table->index(['care_log_id', 'output_time']); 
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('intake_output_records');
    }
};