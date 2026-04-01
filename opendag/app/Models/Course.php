<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = ['name', 'image', 'information', 'careers', 'duration', 'internships', 'code'];

    protected $casts = [
        'careers' => 'array'
    ];
}
