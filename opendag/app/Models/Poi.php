<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Poi extends Model
{
    protected $fillable = ['value', 'label', 'icon', 'floor_id', 'x', 'y', 'category_id'];

    public function floor(){
        return $this->belongsTo(Floor::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }
}
