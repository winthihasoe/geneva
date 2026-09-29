<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('care_plan_photos', function (Blueprint $table) {
            $table->string('kind')->default('care_plan')->after('patient_id');
            $table->unsignedInteger('position')->default(0)->after('kind');
            $table->index(['patient_id', 'kind', 'position'], 'care_plan_photos_patient_kind_position_index');
        });
    }

    public function down(): void
    {
        Schema::table('care_plan_photos', function (Blueprint $table) {
            $table->dropIndex('care_plan_photos_patient_kind_position_index');
            $table->dropColumn(['kind', 'position']);
        });
    }
};
