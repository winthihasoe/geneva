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
        Schema::create('sections', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('icon')->nullable();
            $table->timestamps();
        });

        // Insert default rows
        DB::table('sections')->insert([
            ['name' => 'Elder Health', 'icon' => 'elder_health.png', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Baby Health', 'icon' => 'baby_health.png', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Maternity', 'icon' => 'maternity.png', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'First Aid', 'icon' => 'first_aid.png', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sections');
    }
};
