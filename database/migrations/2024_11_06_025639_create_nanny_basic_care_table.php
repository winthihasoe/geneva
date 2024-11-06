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
        Schema::create('nanny_basic_care', function (Blueprint $table) {
            $table->id();
            $table->string('care_name');
            $table->string('created_by')->nullable();
            $table->timestamps();
        });

        // Initial data
        $basicCareData = [
            "Supervision & safety",
            "Meal Preparation & Feeding",
            "Diapering & Hygiene",
            "Bathing & Dressing",
            "Nap & Sleep Schedule",
            "Toy & Play Area Tidying",
            "Outdoor Supervision",
            "Establishing daily routines",
        ];

        // Insert initial data into the table with created_by set to 'admin'
        foreach ($basicCareData as $care) {
            DB::table('nanny_basic_care')->insert([
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
        Schema::dropIfExists('nanny_basic_care');
    }
};
