<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Floor extends Model
{
    protected $fillable = ['value', 'label', 'image', 'viewBox', 'wallStrokeClass'];

    public function pois(){
        return $this->hasMany(Poi::class);
    }
}
