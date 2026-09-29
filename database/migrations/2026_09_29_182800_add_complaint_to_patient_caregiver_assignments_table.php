<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('patient_caregiver_assignments', function (Blueprint $table) {
            $table->text('complaint')->nullable()->after('assignment_reason');
        });
    }

    public function down(): void
    {
        Schema::table('patient_caregiver_assignments', function (Blueprint $table) {
            $table->dropColumn('complaint');
        });
    }
};
