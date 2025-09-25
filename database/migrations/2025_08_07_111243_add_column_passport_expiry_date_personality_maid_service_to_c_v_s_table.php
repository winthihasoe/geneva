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
            $table->date('passport_expiry_date')->nullable()->after('passport_number');
            $table->string('personality')->nullable()->after('religion');
            $table->boolean('maid_service')->default(false)->after('services');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('c_v_s', function (Blueprint $table) {
            $table->dropColumn('passport_expiry_date');
            $table->dropColumn('personality');
            $table->dropColumn('maid_service');
        });
    }
};
