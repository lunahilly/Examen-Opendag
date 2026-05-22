<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityCourse extends Model
{
    protected $fillable = ['activity_id', 'course_id'];

    public function activities(){
        return $this->belongsTo(Activity::class);
    }

    public function activityCourses(){
        return $this->hasMany(ActivityCourse::class);
    }
}