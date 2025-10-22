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
        Schema::create('social_media', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('icon')->nullable();
            $table->string('description')->nullable();
            $table->text('url')->nullable();
            $table->string('line_id')->nullable();
            $table->timestamps();
        });

        DB::table('social_media')->insert([
            [
                'name' => 'TikTok',
                'icon' => '',
                'description' => 'Follow us on TikTok',
                'url' => 'https://www.tiktok.com/@heartyaid?is_from_webapp=1&sender_device=pc',
                'line_id' => '',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Instagram',
                'icon' => '',
                'description' => 'Follow us on Instagram',
                'url' => 'https://www.instagram.com/heartyaid.bkk/',
                'line_id' => '',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Facebook',
                'icon' => '',
                'description' => 'Follow us on Facebook',
                'url' => 'https://www.facebook.com/share/1a1dmQhWs5/?mibextid=wwXIfr',
                'line_id' => '',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            [
                'name' => 'LINE',
                'icon' => '',
                'description' => 'Chat us on Line',
                'url' => '',
                'line_id' => '9H72AAvKTc',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('social_media');
    }
};
