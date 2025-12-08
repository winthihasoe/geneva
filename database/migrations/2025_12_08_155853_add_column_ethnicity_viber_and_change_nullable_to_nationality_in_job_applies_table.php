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
        Schema::table('job_applies', function (Blueprint $table) {
            $table->string('ethnicity')->nullable()->after('nationality');
            $table->string('viber')->nullable()->after('phone');
            $table->string('nationality')->nullable()->change();
            $table->text('current_address')->change();
            $table->text('certificate_details')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_applies', function (Blueprint $table) {
            $table->dropColumn(['ethnicity', 'viber']);
            $table->string('nationality')->nullable(false)->change();
            $table->string('current_address')->change();
            $table->string('certificate_details')->change();
        });
    }
};
