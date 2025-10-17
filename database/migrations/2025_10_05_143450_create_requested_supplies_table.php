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
        Schema::create('requested_supplies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('care_log_id')->constrained('care_logs')->onDelete('cascade');
            
            // Requested Supplies data from: { item: "", quantity: "", purpose: "", priority: "" }
            $table->string('item')->nullable();
            $table->string('quantity')->nullable(); // Can be "5", "2 boxes", etc.
            $table->text('purpose')->nullable(); // Why the item is needed
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
            
            $table->timestamps();
            
            // Index for better query performance
            $table->index(['care_log_id', 'priority']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requested_supplies');
    }
};
