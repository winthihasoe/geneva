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
        // Add uuid column without unique constraint first
        Schema::table('care_plans', function (Blueprint $table) {
            $table->uuid('uuid')->nullable()->after('id');
        });
        
        // Generate UUIDs for all existing records (handles empty strings too)
        DB::table('care_plans')->get()->each(function ($carePlan) {
            DB::table('care_plans')
                ->where('id', $carePlan->id)
                ->update(['uuid' => (string) Str::uuid()]);
        });
        
        // Now add the unique constraint
        Schema::table('care_plans', function (Blueprint $table) {
            $table->unique('uuid');
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
