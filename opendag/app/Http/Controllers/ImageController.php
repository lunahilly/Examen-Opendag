<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function store(Request $request, string $type){
        $request->validate([
            'image' => 'required'
        ]);
        $path =  $request->file('image')->store($type, 'public');

        return back()->with('status', $path);
    }
}
