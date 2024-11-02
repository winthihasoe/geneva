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
        Schema::create('salaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('package_duration_id')->constrained()->onDelete('cascade');
            $table->string('role')->nullable(); // e.g., "Nanny Salary", "Super Nanny Salary"
            $table->integer('amount'); 
            $table->timestamps();
        });

        // Insert initial data for salaries
        DB::table('salaries')->insert([
            // Nanny Service - Live-out
            ['package_duration_id' => 1, 'role' => 'Nanny Salary', 'amount' => 15000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 1, 'role' => 'Super Nanny Salary', 'amount' => 19000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 2, 'role' => 'Nanny Salary', 'amount' => 14000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 2, 'role' => 'Super Nanny Salary', 'amount' => 18000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 3, 'role' => 'Nanny Salary', 'amount' => 13000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 3, 'role' => 'Super Nanny Salary', 'amount' => 17000, 'created_at' => now(), 'updated_at' => now()],

            // Nanny Service - Live-in
            ['package_duration_id' => 4, 'role' => 'Nanny Salary', 'amount' => 17000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 4, 'role' => 'Super Nanny Salary', 'amount' => 24000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 5, 'role' => 'Nanny Salary', 'amount' => 16000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 5, 'role' => 'Super Nanny Salary', 'amount' => 23000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 6, 'role' => 'Nanny Salary', 'amount' => 15000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 6, 'role' => 'Super Nanny Salary', 'amount' => 22000, 'created_at' => now(), 'updated_at' => now()],

            // Newborn Care - Live-out
            ['package_duration_id' => 7, 'role' => 'Nanny Salary', 'amount' => 17000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 7, 'role' => 'Super Nanny Salary', 'amount' => 24000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 8, 'role' => 'Nanny Salary', 'amount' => 16000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 8, 'role' => 'Super Nanny Salary', 'amount' => 23000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 9, 'role' => 'Nanny Salary', 'amount' => 15000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 9, 'role' => 'Super Nanny Salary', 'amount' => 22000, 'created_at' => now(), 'updated_at' => now()],

            // Newborn Care - Live-in
            ['package_duration_id' => 10, 'role' => 'Nanny Salary', 'amount' => 21000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 10, 'role' => 'Super Nanny Salary', 'amount' => 27000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 11, 'role' => 'Nanny Salary', 'amount' => 20000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 11, 'role' => 'Super Nanny Salary', 'amount' => 26000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 12, 'role' => 'Nanny Salary', 'amount' => 19000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 12, 'role' => 'Super Nanny Salary', 'amount' => 25000, 'created_at' => now(), 'updated_at' => now()],

            // Senior Care + Maid Service - Live-out
            ['package_duration_id' => 13, 'role' => 'Caregiver + Maid Salary', 'amount' => 17000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 14, 'role' => 'Caregiver + Maid Salary', 'amount' => 16000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 15, 'role' => 'Caregiver + Maid Salary', 'amount' => 15000, 'created_at' => now(), 'updated_at' => now()],

            // Senior Care + Maid Service - Live-in
            ['package_duration_id' => 16, 'role' => 'Caregiver + Maid Salary', 'amount' => 19000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 17, 'role' => 'Caregiver + Maid Salary', 'amount' => 18000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 18, 'role' => 'Caregiver + Maid Salary', 'amount' => 17000, 'created_at' => now(), 'updated_at' => now()],

            // Nanny Care + Maid Service - Live-out
            ['package_duration_id' => 19, 'role' => 'Nanny + Maid Salary', 'amount' => 17000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 20, 'role' => 'Nanny + Maid Salary', 'amount' => 16000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 21, 'role' => 'Nanny + Maid Salary', 'amount' => 15000, 'created_at' => now(), 'updated_at' => now()],

            // Nanny + Maid Care + Maid Service - Live-in
            ['package_duration_id' => 22, 'role' => 'Nanny + Maid Salary', 'amount' => 19000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 23, 'role' => 'Nanny + Maid Salary', 'amount' => 18000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 24, 'role' => 'Nanny + Maid Salary', 'amount' => 17000, 'created_at' => now(), 'updated_at' => now()],

            // Elder care - Live-out
            ['package_duration_id' => 25, 'role' => 'Caregiver Salary', 'amount' => 15000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 25, 'role' => 'Adv Caregiver Salary', 'amount' => 19000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 26, 'role' => 'Caregiver Salary', 'amount' => 14000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 26, 'role' => 'Adv Caregiver Salary', 'amount' => 18000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 27, 'role' => 'Caregiver Salary', 'amount' => 13000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 27, 'role' => 'Adv Caregiver Salary', 'amount' => 17000, 'created_at' => now(), 'updated_at' => now()],
 
            // Elder care - Live-in
            ['package_duration_id' => 28, 'role' => 'Caregiver Salary', 'amount' => 17000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 28, 'role' => 'Adv Caregiver Salary', 'amount' => 24000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 29, 'role' => 'Caregiver Salary', 'amount' => 16000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 29, 'role' => 'Adv Caregiver Salary', 'amount' => 23000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 30, 'role' => 'Caregiver Salary', 'amount' => 15000, 'created_at' => now(), 'updated_at' => now()],
            ['package_duration_id' => 30, 'role' => 'Adv Caregiver Salary', 'amount' => 22000, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salaries');
    }
};
