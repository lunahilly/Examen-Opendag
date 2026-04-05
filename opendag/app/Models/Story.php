<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    protected $fillable = ['name', 'course_id', 'image', 'story'];

    public function course(){
        return $this->belongsTo(Course::class);
    }
}
