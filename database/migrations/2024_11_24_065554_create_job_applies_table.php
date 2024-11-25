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
        Schema::create('job_applies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('date_of_birth');
            $table->string('gender');
            $table->smallInteger('height')->unsigned();
            $table->decimal('weight', 5, 1)->unsigned();
            $table->string('nationality');
            $table->string('religion');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('line')->nullable();
            $table->string('current_address');
            $table->text('experience')->nullable();
            $table->string('language')->nullable();
            $table->string('passport')->nullable();
            $table->string('visa')->nullable();
            $table->text('certificate_details')->nullable();
            $table->json('certificates')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applies');
    }
};
