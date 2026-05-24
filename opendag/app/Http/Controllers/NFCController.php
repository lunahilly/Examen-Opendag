<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NFCController extends Controller
{
    public function index()
    {
        return Inertia::render('NFC/NFC');
    }

}
