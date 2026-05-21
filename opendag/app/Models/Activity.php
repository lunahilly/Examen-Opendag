<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = ['title', 'is_general', 'image', 'description'];

    public function activityCourses(){
        return $this->belongsTo(ActivityCourse::class);
    }

    // public function course(){
    //     return $this->belongsTo(Course::class);
    // }

    // public function activityType(){
    //     return $this->belongsTo(ActivityType::class);
    // }

}
