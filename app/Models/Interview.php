<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'cv_id',
        'care_plan_id',
        'date',
        'time',
        'alt_date',
        'alt_time',
        'mode',
        'location',
        'online',
        'status',
        'is_approved',
        'approved_by',
        'approved_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function cv()
    {
        return $this->belongsTo(CV::class);
    }
    
    public function carePlan()
    {
        return $this->belongsTo(CarePlan::class);
    }
    
}
