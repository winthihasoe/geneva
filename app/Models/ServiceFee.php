<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceFee extends Model
{
    use HasFactory;

    protected $fillable = ['package_duration_id', 'fee'];

    public function packageDuration()
    {
        return $this->belongsTo(PackageDuration::class);
    }
}
