<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = ['course_id', 'activity_type_id', 'time'];

    public function course(){
        return $this->belongsTo(Course::class);
    }

    public function activityType(){
        return $this->belongsTo(ActivityType::class);
    }

}
