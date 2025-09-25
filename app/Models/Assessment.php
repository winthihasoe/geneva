<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'date_of_birth',
        'gender',
        'phone',
        'email',
        'address',
        'education',
        'certifications',
        'experience_years',
        'experience_details',
        'status',
        'admin_review',
    ];
}
