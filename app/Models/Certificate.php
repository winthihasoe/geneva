<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasFactory;

    // Define fillable fields for mass assignment
    protected $fillable = [
        'cv_id',
        'training_center_name',
        'qualification_type',
        'course',
        'start_date',
        'duration',
        'certificate_photo',
    ];

    /**
     * Relationship with CV model
     * A certificate belongs to a single CV
     */
    public function cv()
    {
        return $this->belongsTo(CV::class, 'cv_id');
    }
}
