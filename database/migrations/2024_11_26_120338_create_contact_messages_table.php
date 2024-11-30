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
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable(); // If the message is from a logged-in user
            $table->string('name')->nullable(); // Name of the sender (nullable if user_id exists)
            $table->string('email'); // Email is mandatory
            $table->string('phone_number')->nullable(); // Phone number is optional
            $table->text('message'); // Message is mandatory
            $table->boolean('is_read')->default(false);
            $table->boolean('is_replied')->default(false); // Indicates if the message has been replied to
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
    }
};
