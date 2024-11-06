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
        Schema::create('newborn_basic_care', function (Blueprint $table) {
            $table->id();
            $table->string('care_name');
            $table->string('created_by')->nullable();
            $table->timestamps();
        });

        // Initial data
        $basicCareData = [
            "Bottle-feeding",
            "Breastfeeding",
            "Bathing & Grooming",
            "Diapering & Hygiene",
            "Sleep Routines & Soothing",
            "Tummy time & Gentle playing",
            "Emotional Comforting (example: holding, rocking & gentle interaction)",
            "Monitoring Vital Signs",
            "Routine Care Log (Documenting daily activities such as feeding, sleeping & etc)"
        ];

        // Insert initial data into the table
        foreach ($basicCareData as $care) {
            DB::table('newborn_basic_care')->insert([
                'care_name' => $care,
                'created_by' => "admin",
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
        Schema::dropIfExists('newborn_basic_care');
    }
};
