<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Course;
use App\Models\Setting;
use App\Models\Story;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Settings/Settings');
        // $settings = Setting::find(1);
        // $courses = Course::paginate(10);
        // $stories = Story::paginate(10);
        // $activities = Activity::paginate(10);
        // return Inertia::render('Dashboard', [
        //     'settings' => $settings,
        //     'courses' => $courses,
        //     'stories' => $stories,
        //     'activities' => $activities
        // ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $this->validateData($request);
        $settings = Setting::find(1);
        $settings->update($data);
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    
    protected function validateData(Request $request){
        $data = $request->validate([
            'courses' => 'required',
            'stories' => 'required',
            'activities' => 'required',
            'contact' => 'required'
        ]);
        return $data;
    }
}
