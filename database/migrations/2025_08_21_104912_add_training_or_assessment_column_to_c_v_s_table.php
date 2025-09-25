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
            $table->string('training_or_assessment')->nullable()->after('agree_to_terms');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('c_v_s', function (Blueprint $table) {
            $table->dropColumn('training_or_assessment');
        });
    }
};
