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
            $table->string('visa_stamp')->nullable()->after('passport');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('c_v_s', function (Blueprint $table) {
            $table->dropColumn('visa_stamp');
        });
    }
};
