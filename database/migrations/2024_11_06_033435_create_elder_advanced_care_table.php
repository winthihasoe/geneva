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
        Schema::create('elder_advanced_care', function (Blueprint $table) {
            $table->id();
            $table->string('care_name');
            $table->string('created_by')->nullable();
            $table->timestamps();
        });

        // Initial data
        $advancedCareData = [
            "Ryle Tube (Nasogastric) Feeding",
            "Tracheostomy Care and Suctioning",
            "Urinary Catheter Care",
            "Wound Care and Dressing Changes",
            "Respiratory support (assisting with nebulizer & oxygen therapy)",
            "Insulin Injection and Blood Glucose Monitoring",
            "Peritoneal Dialysis Assistance",
            "Bowel and Bladder Training",
            "Advanced Physical Therapy Support",
            "Assistance with Rehabilitation and Recovery Care",
            "Memory Care and Cognitive Support for Advanced Dementia",
            "CPR & First Aid Readiness",
            "End-of-Life Palliative Care",
        ];

        // Insert initial data into the table 
        foreach ($advancedCareData as $care) {
            DB::table('elder_advanced_care')->insert([
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
        Schema::dropIfExists('elder_advanced_care');
    }
};
