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
        Schema::create('nanny_maid_service', function (Blueprint $table) {
            $table->id();
            $table->string('service_name');
            $table->string('created_by')->nullable(); 
            $table->timestamps();
        });

        // Initial data
        $maidServiceData = [
            "Child related tasks",
            "Handle laundry",
            "Light house cleaning",
            "Cooking meals",
            "Dispose of waste",
        ];

        // Insert initial data into the table 
        foreach ($maidServiceData as $service) {
            DB::table('nanny_maid_service')->insert([
                'service_name' => $service,
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
        Schema::dropIfExists('nanny_maid_service');
    }
};
