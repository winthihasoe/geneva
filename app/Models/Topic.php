<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'section_id', 'icon'];

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function blogs()
    {
        return $this->belongsToMany(Blog::class, 'blog_topic');
    }
}
