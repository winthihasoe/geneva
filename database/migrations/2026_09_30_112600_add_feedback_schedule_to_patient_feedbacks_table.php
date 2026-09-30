<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('patient_feedbacks', function (Blueprint $table) {
            $table->string('feedback_type')->nullable()->after('body');
            $table->string('follow_up')->nullable()->after('feedback_type');
        });
    }

    public function down(): void
    {
        Schema::table('patient_feedbacks', function (Blueprint $table) {
            $table->dropColumn(['feedback_type', 'follow_up']);
        });
    }
};
