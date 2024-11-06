<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaccination extends Model
{
    use HasFactory;

    protected $fillable = [
        'cv_id',
        'vaccine_name',
        'vaccination_date',
        'next_due_date',
        'dose_number',
        'status',
        'remarks',
    ];

    public function cv()
    {
        return $this->belongsTo(CV::class, 'cv_id');
    }
}
