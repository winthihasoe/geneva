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
        Schema::create('hygiene_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('care_log_id')->constrained('care_logs')->onDelete('cascade');
            
            // Hygiene data from: { time: "", activity: "", products: "", notes: "" }
            $table->time('hygiene_time')->nullable();
            $table->string('hygiene_activity')->nullable(); // Bath, Diaper change, Face wash, etc.
            $table->string('products_used')->nullable(); // Products/supplies used
            $table->text('notes')->nullable();
            $table->boolean('moisturizer_applied')->default(false)->nullable();
            $table->boolean('pressure_areas_checked')->default(false)->nullable();
            $table->text('skin_care_findings')->nullable();
            
            $table->timestamps();
            
            // Index for better query performance
            $table->index(['care_log_id', 'hygiene_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hygiene_records');
    }
};
