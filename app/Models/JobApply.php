<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApply extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'date_of_birth',
        'gender',
        'height',
        'weight',
        'nationality',
        'religion',
        'phone',
        'email',
        'line',
        'current_address',
        'experience',
        'language',
        'passport', // Path to the uploaded passport file
        'visa',     // Path to the uploaded visa file
        'certificates', // JSON-encoded array of certificate paths
        'certificate_details',
    ];

    protected $casts = [
        'certificates' => 'array', // Automatically decode JSON into an array when accessed
    ];
}
