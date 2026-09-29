<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('case_records', function (Blueprint $table) {
            $table->id();
            $table->string('branch');
            $table->dateTime('inquiry_at')->nullable();
            $table->text('inquiry_note')->nullable();
            $table->string('care_type')->nullable();
            $table->string('name');
            $table->text('address')->nullable();
            $table->string('phone')->nullable();
            $table->string('requested_start')->nullable();
            $table->date('requested_start_date')->nullable();
            $table->string('duration')->nullable();
            $table->string('level')->nullable();
            $table->string('duty_type')->nullable();
            $table->dateTime('cv_sent_at')->nullable();
            $table->text('cv_sent_note')->nullable();
            $table->text('client_response')->nullable();
            $table->date('interview_date')->nullable();
            $table->text('interview_note')->nullable();
            $table->date('confirm_date')->nullable();
            $table->text('confirm_note')->nullable();
            $table->text('deposit_note')->nullable();
            $table->date('duty_start_date')->nullable();
            $table->text('duty_start_note')->nullable();
            $table->string('status')->default('open');
            $table->text('notes')->nullable();
            $table->foreignId('patient_id')->nullable()->constrained('patients')->nullOnDelete();
            $table->string('source_sheet')->nullable();
            $table->unsignedInteger('source_row')->nullable();
            $table->timestamps();

            $table->unique(['source_sheet', 'source_row']);
            $table->index('branch');
            $table->index('status');
            $table->index('care_type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('case_records');
    }
};
