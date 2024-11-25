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
        Schema::table('care_plans', function (Blueprint $table) {
            $table->text('other_medical_conditions')->nullable()->after('medical_conditions');
            $table->string('mobilities')->nullable()->after('other_medical_conditions');
            $table->string('memory')->nullable()->after('mobilities');
            $table->string('alertness')->nullable()->after('memory');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('care_plans', function (Blueprint $table) {
            $table->dropColumn('other_medical_conditions');
            $table->dropColumn('mobilities');
            $table->dropColumn('memory');
            $table->dropColumn('alertness');
        });
    }
};
