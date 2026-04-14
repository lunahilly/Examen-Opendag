<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = ['course_id', 'activity_type_id', 'activity', 'time'];

    public function course(){
        return $this->belongsTo(Course::class);
    }
}
