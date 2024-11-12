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
        Schema::create('interviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('cv_id')->constrained('c_v_s')->onDelete('cascade');
            $table->foreignId('care_plan_id')->constrained('care_plans')->onDelete('cascade');
            $table->date('date')->nullable();
            $table->time('time')->nullable();
            $table->date('alt_date')->nullable();
            $table->time('alt_time')->nullable();
            $table->string('mode')->nullable(); 
            $table->string('location')->nullable(); 
            $table->text('online')->nullable();
            $table->string('status')->default('pending');
            $table->boolean('is_approved')->default(false);
            $table->string('approved_by')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interviews');
    }
};
