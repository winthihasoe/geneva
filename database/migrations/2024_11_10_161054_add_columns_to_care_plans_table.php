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
            $table->boolean('is_read')->default(false)->after('additional_notes');
            $table->unsignedTinyInteger('current_step')->nullable()->after('is_read');  
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('care_plans', function (Blueprint $table) {
            $table->dropColumn('is_read');
            $table->dropColumn('current_step');
        });
    }
};
