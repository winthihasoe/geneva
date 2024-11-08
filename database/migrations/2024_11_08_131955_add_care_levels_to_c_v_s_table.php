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
        Schema::table('c_v_s', function (Blueprint $table) {
            $table->string('newborn_care_level')->nullable()->after('level');
            $table->string('nanny_care_level')->nullable()->after('newborn_care_level');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('c_v_s', function (Blueprint $table) {
            $table->dropColumn(['newborn_care_level', 'nanny_care_level']);
        });
    }
};
