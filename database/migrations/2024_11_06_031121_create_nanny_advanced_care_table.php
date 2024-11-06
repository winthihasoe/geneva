<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nanny_advanced_care', function (Blueprint $table) {
            $table->id();
            $table->string('care_name');
            $table->string('created_by')->nullable();
            $table->timestamps();
        });

        // Initial data
        $advancedCareData = [
            "Developmental milestones tracking",
            "Early childhood education activities",
            "Advanced Potty Training Support",
            "Special needs support",
            "Activities for motor skills development",
            "Emotional development support",
            "Health monitoring & first aid support",
        ];

        // Insert initial data into the table 
        foreach ($advancedCareData as $care) {
            DB::table('nanny_advanced_care')->insert([
                'care_name' => $care,
                'created_by' => 'admin', 
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nanny_advanced_care');
    }
};
