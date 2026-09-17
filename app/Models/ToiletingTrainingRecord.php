<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToiletingTrainingRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'care_log_id',
        'time',
        'toilet_attempt',
        'result',
        'type',
        'reaction',
        'notes',
    ];

    protected $casts = [
        'time' => 'datetime:H:i',
    ];

    public function careLog()
    {
        return $this->belongsTo(CareLog::class);
    }
}
