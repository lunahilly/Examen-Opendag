<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Course;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $settings = Setting::find(1);
        if($settings->activities == true){
            $activities = Activity::all();
            return Inertia::render('Activities/Activities', [
                'activities' => $activities
            ]);
        }
        else{
        return redirect('/');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Activities/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $this->validateData($request);
        $activity = new Activity($data);
        $activity->save();
        return redirect(route('activities.index'));
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $activity = Activity::find($id)->delete();
        return back();
    }

    protected function validateData(Request $request){
        $data = $request->validate([
            'title' => 'required',
            'is_general' => 'required',
            'image' => '',
            'description' => ''
        ]);
        return $data;
    }
}
