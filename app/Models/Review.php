<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'cv_id',
        'rating',
        'tags',
        'comment',
    ];

    protected $casts = [
        'rating' => 'integer',
        'tags' => 'array',
    ];

    // Relationships

    public function cv()
    {
        return $this->belongsTo(CV::class);
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}
