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
        $request->validate([
            'image' => ''
        ]);
        if($request->file('image')){
            // dd('queen');
            $path = $request->file('image')->store('activities', 'public'); // also here public_html voor de live
            $data = $this->validateData($request);
            $data['image'] = '/'.'storage/'.$path; // storage naar uploads als live whatevhgor

        }
        else{
            $data = $this->validateData($request);
            // dd('no queen');
        }
        // $path = $request->file('image')->store('activities', 'public');
        // $request['image'] = '/'.'uploads'.$path;
        // $data['image'] = '/'.'uploads/'.$path;
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
        $activity = Activity::find($id);
        return Inertia::render('Activities/Form', [
            'activity' => $activity
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'image' => ''
        ]);
        if($request->file('image')){
            $path = $request->file('image')->store('activities', 'public'); //public_html 4 live
            $data = $this->validateData($request);
            $data['image'] = '/'.'storage/'.$path; //uploads 4 live n storage 4 local
        }
        else{
            $data = $this->validateData($request);
        }
        $activity = Activity::find($id);
        $activity->update($data);
        return redirect(route('activities.index'));
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
