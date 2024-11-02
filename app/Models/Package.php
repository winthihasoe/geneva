<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    protected $fillable = ['service_id', 'type', 'title', 'duty_time', 'working_days', 'meals_provided'];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function durations()
    {
        return $this->hasMany(PackageDuration::class);
    }
}
