<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'icon'];

    public function topics()
    {
        return $this->hasMany(Topic::class);
    }

    public function blogs()
    {
        return $this->hasMany(Blog::class);
    }
}
