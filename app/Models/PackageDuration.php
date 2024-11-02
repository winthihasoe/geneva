<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PackageDuration extends Model
{
    use HasFactory;

    protected $fillable = ['package_id', 'duration', 'replacement_policy'];

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    public function salaries()
    {
        return $this->hasMany(Salary::class);
    }

    public function serviceFees()
    {
        return $this->hasMany(ServiceFee::class);
    }
}
