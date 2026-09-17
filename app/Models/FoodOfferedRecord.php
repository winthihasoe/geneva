<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FoodOfferedRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'care_log_id',
        'meal_time',
        'food_offered',
        'quantity',
        'texture',
        'reaction_notes',
    ];

    public function careLog()
    {
        return $this->belongsTo(CareLog::class);
    }
}
