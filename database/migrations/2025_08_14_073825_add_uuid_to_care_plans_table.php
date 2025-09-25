<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('care_plans', function (Blueprint $table) {
            $table->uuid('uuid')->unique()->after('id');
        });
        DB::table('care_plans')->whereNull('uuid')->get()->each(function ($carePlan) {
            DB::table('care_plans')
                ->where('id', $carePlan->id)
                ->update(['uuid' => Str::uuid()]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('care_plans', function (Blueprint $table) {
            $table->dropColumn('uuid');
        });
    }
};
