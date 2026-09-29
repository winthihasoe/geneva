<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('recruitment_records');

        Schema::table('job_applies', function (Blueprint $table) {
            $table->date('date_of_birth')->nullable()->change();
            $table->string('gender')->nullable()->change();
            $table->string('height')->nullable()->change();
            $table->string('weight')->nullable()->change();
            $table->string('religion')->nullable()->change();
            $table->string('phone')->nullable()->change();
            $table->text('current_address')->nullable()->change();

            $table->string('source')->default('website')->after('status');
            $table->string('coordinated_by')->nullable()->after('source');
            $table->string('interviewed_by')->nullable()->after('coordinated_by');
            $table->date('cv_reported_date')->nullable()->after('interviewed_by');
            $table->date('interview_date')->nullable()->after('cv_reported_date');
            $table->date('training_start_date')->nullable()->after('interview_date');
            $table->date('assessment_date')->nullable()->after('training_start_date');
            $table->unsignedSmallInteger('interview_score')->nullable()->after('assessment_date');
            $table->text('interview_score_note')->nullable()->after('interview_score');
            $table->text('interview_note')->nullable()->after('interview_score_note');
            $table->string('decision')->default('pending')->after('interview_note');
            $table->string('assessment_score')->nullable()->after('decision');
            $table->text('training_note')->nullable()->after('assessment_score');
            $table->text('assessment_note')->nullable()->after('training_note');
            $table->text('notes')->nullable()->after('assessment_note');
            $table->foreignId('cv_id')->nullable()->after('notes')->constrained('c_v_s')->nullOnDelete();
            $table->string('source_sheet')->nullable()->after('cv_id');
            $table->unsignedInteger('source_row')->nullable()->after('source_sheet');

            $table->unique(['source_sheet', 'source_row']);
            $table->index('source');
            $table->index('decision');
            $table->index('service_area');
        });
    }

    public function down(): void
    {
        Schema::table('job_applies', function (Blueprint $table) {
            $table->dropUnique(['source_sheet', 'source_row']);
            $table->dropIndex(['source']);
            $table->dropIndex(['decision']);
            $table->dropIndex(['service_area']);
            $table->dropConstrainedForeignId('cv_id');
            $table->dropColumn([
                'source',
                'coordinated_by',
                'interviewed_by',
                'cv_reported_date',
                'interview_date',
                'training_start_date',
                'assessment_date',
                'interview_score',
                'interview_score_note',
                'interview_note',
                'decision',
                'assessment_score',
                'training_note',
                'assessment_note',
                'notes',
                'source_sheet',
                'source_row',
            ]);

            $table->date('date_of_birth')->nullable(false)->change();
            $table->string('gender')->nullable(false)->change();
            $table->string('height')->nullable(false)->change();
            $table->string('weight')->nullable(false)->change();
            $table->string('religion')->nullable(false)->change();
            $table->string('phone')->nullable(false)->change();
            $table->text('current_address')->nullable(false)->change();
        });
    }
};
