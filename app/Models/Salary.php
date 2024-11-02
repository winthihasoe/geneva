<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{
    use HasFactory;

    protected $fillable = ['package_duration_id', 'role', 'amount'];

    public function packageDuration()
    {
        return $this->belongsTo(PackageDuration::class);
    }
}
