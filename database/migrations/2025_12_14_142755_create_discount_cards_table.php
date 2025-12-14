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
        Schema::create('discount_cards', function (Blueprint $table) {
            $table->id();
            $table->string('card_no')->unique();
            $table->foreignId('patient_id')->nullable()->constrained('patients')->onDelete('set null');
            $table->foreignId('review_id')->nullable()->constrained('reviews')->onDelete('set null');
            $table->decimal('discount_amount', 10, 2)->default(0);
            $table->unsignedTinyInteger('discount_percentage')->nullable();
            $table->boolean('is_used')->default(false);
            $table->string('discount_code')->nullable();
            $table->string('issued_for')->nullable();
            $table->string('issued_by')->nullable();
            $table->timestamp('used_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discount_cards');
    }
};
