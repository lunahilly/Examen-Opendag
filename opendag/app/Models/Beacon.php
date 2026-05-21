<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Beacon extends Model
{
    protected $fillable = ['name', 'bluetooth_id', 'redirect_url'];
}
