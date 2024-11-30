<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = ['cv_id', 'experience', 'detail'];

    public function cv()
    {
        return $this->belongsTo(CV::class, 'cv_id');
    }
}
