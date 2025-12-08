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
        Schema::table('job_applies', function (Blueprint $table) {
            $table->string('height')->change();
            $table->string('weight')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_applies', function (Blueprint $table) {
            $table->smallInteger('height')->unsigned()->change();
            $table->decimal('weight', 5, 1)->unsigned()->change();
        });
    }
};
