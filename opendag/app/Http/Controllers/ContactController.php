<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index(){
        $settings = Setting::find(1);
        if($settings->contact == true){
            return Inertia::render('Contact/Contact');
        }
        else{
            return redirect('/');
        }
    }
        public function add(){
        $settings = Setting::find(1);
        if($settings->contact == true){
            return Inertia::render('Contact/Form');
        }
        else{
            return redirect('/');
        }
    }
}
