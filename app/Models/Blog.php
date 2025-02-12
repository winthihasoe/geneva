<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'content', 'header_image', 'section_id'];

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function topics()
    {
        return $this->belongsToMany(Topic::class, 'blog_topic');
    }

    public function images()
    {
        return $this->hasMany(BlogImage::class);
    }
}
