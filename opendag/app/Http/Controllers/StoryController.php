<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Setting;
use App\Models\Story;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $settings = Setting::find(1);
        if($settings->stories == true){
            $stories = Story::with('course')->latest()->get();
            $courses = Course::all();
            return Inertia::render('Stories/Stories', [
                'stories' => $stories,
                'courses' => $courses
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
        $courses = Course::all();
        return Inertia::render('Stories/Form', [
            'courses' => $courses
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request);
        $request->validate([
            'image' => 'required'
        ]);
        $path = $request->file('image')->store('students', 'public');
        // dd($path);
        $request['image'] = $path;
        $data = $this->validateData($request);
        $story = new Story($data);
        $story->save();
        return redirect(route('stories.index'));
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
        $story = Story::find($id);
        $courses = Course::all();
        return Inertia::render('Stories/Form', [
            'story' => $story,
            'courses' => $courses
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $this->validateData($request);
        $story = Story::find($id);
        $story->update($data);
        return redirect(route('stories.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $story = Story::find($id)->delete();
        return back();
    }

    protected function validateData(Request $request){
        $data = $request->validate([
            'name' => 'required',
            'course_id' => 'required',
            'image' => '',
            'story' => 'required' 
        ]);
        return $data;
    }
}
