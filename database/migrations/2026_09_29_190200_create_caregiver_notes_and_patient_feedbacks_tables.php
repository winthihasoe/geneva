<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assignment_notes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('patient_caregiver_assignment_id');
            $table->enum('kind', ['feedback', 'complaint']);
            $table->text('body');
            $table->unsignedBigInteger('recorded_by')->nullable();
            $table->timestamps();

            $table->foreign('patient_caregiver_assignment_id', 'assignment_notes_assignment_fk')
                ->references('id')
                ->on('patient_caregiver_assignments')
                ->cascadeOnDelete();
            $table->foreign('recorded_by', 'assignment_notes_recorder_fk')
                ->references('id')
                ->on('users')
                ->nullOnDelete();
        });

        Schema::create('patient_feedbacks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->cascadeOnDelete();
            $table->text('body');
            $table->foreignId('recorded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        $now = now();

        DB::table('patient_caregiver_assignments')
            ->whereNotNull('complaint')
            ->orderBy('id')
            ->lazyById()
            ->each(function ($assignment) use ($now) {
                $body = trim((string) $assignment->complaint);
                if ($body === '') {
                    return;
                }

                DB::table('assignment_notes')->insert([
                    'patient_caregiver_assignment_id' => $assignment->id,
                    'kind' => 'complaint',
                    'body' => $body,
                    'recorded_by' => null,
                    'created_at' => $assignment->updated_at ?? $now,
                    'updated_at' => $assignment->updated_at ?? $now,
                ]);
            });

        DB::table('patients')
            ->whereNotNull('feedback')
            ->orderBy('id')
            ->lazyById()
            ->each(function ($patient) use ($now) {
                $body = trim((string) $patient->feedback);
                if ($body === '') {
                    return;
                }

                DB::table('patient_feedbacks')->insert([
                    'patient_id' => $patient->id,
                    'body' => $body,
                    'recorded_by' => null,
                    'created_at' => $patient->updated_at ?? $now,
                    'updated_at' => $patient->updated_at ?? $now,
                ]);
            });

        Schema::table('patient_caregiver_assignments', function (Blueprint $table) {
            $table->dropColumn('complaint');
        });

        Schema::table('patients', function (Blueprint $table) {
            $table->dropColumn('feedback');
        });
    }

    public function down(): void
    {
        Schema::table('patient_caregiver_assignments', function (Blueprint $table) {
            $table->text('complaint')->nullable()->after('assignment_reason');
        });

        Schema::table('patients', function (Blueprint $table) {
            $table->text('feedback')->nullable()->after('notes');
        });

        Schema::dropIfExists('patient_feedbacks');
        Schema::dropIfExists('assignment_notes');
    }
};
