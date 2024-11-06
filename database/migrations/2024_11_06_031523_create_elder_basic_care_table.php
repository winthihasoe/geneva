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
        Schema::create('elder_basic_care', function (Blueprint $table) {
            $table->id();
            $table->string('care_name');
            $table->string('created_by')->nullable();
            $table->timestamps();
        });

        // Initial data
        $basicCareData = [
            "Personal Hygiene and Grooming",
            "Mobility Assistance",
            "Meal Preparation and Feeding Support",
            "Medication Reminders & Administration",
            "Companionship and Social Interaction",
            "Safety Supervision",
            "Basic Physical Activity Support",
            "Monitoring Vital Signs",
            "Routine Care Log (Documenting daily activities)",
        ];

        // Insert initial data into the table
        foreach ($basicCareData as $care) {
            DB::table('elder_basic_care')->insert([
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
        Schema::dropIfExists('elder_basic_care');
    }
};
