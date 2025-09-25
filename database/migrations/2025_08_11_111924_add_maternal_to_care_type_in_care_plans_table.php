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
            $table->enum('care_type', ['Baby', 'Elder', 'Maternal'])->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Check if any records use 'Maternal' before removing it
        $maternalCount = DB::table('care_plans')->where('care_type', 'Maternal')->count();
        
        if ($maternalCount > 0) {
            throw new \Exception("Cannot rollback: {$maternalCount} records have care_type 'Maternal'. Please handle these records first.");
        }
        Schema::table('care_plans', function (Blueprint $table) {
            $table->enum('care_type', ['Baby', 'Elder'])->change();
        });
    }
};
