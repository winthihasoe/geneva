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
        Schema::create('newborn_advanced_care', function (Blueprint $table) {
            $table->id();
            $table->string('care_name');
            $table->string('created_by')->nullable();
            $table->timestamps();
        });

         // Initial data
         $advancedCareData = [
            "Early development assessments",
            "Activities for motor & sensory development",
            "Colic & reflux management",
            "Medication administration",
            "Respiratory support (assisting with nebulizer & oxygen therapy)",
            "Feeding tube management",
            "Care for premature infants",
            "Blood sugar monitoring",
            "Jaundice management",
            "Vital Signs monitoring & reporting",
            "Seizures care & monitoring",
            "Infant CPR & First Aid Readiness",
            "Emergency Preparedness and Care Planning"
        ];

        // Insert initial data into the table with created_by set to 'admin'
        foreach ($advancedCareData as $care) {
            DB::table('newborn_advanced_care')->insert([
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
        Schema::dropIfExists('newborn_advanced_care');
    }
};
