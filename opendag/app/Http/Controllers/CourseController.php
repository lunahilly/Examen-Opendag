<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Course;
use App\Models\Poi;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $settings = Setting::find(1);
        if($settings->courses == true){
            $courses = Course::all();
            $pois = Poi::all();
            return Inertia::render('Information/Information', [
                'courses' => $courses,
                'pois' => $pois
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
        return Inertia::render('Information/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required'
        ]);
        $path = $request->file('image')->store('courses', 'public'); // public_html 4 live
        // dd($path);
        // $request['image'] = '/'.'uploads'.$path;
        $data = $this->validateData($request);
        $data['image'] = '/' . 'storage/' . $path; // terug naar uploads als live is, zo not forget
        // $data = $this->validateData($request);
        $course = new Course($data);
        $course->save();
        return redirect(route('information.index'));
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
        $course = Course::find($id);
        $activities = Activity::where('is_general', 0)->get();
        return Inertia::render('Information/Form', [
            'course' => $course,
            'activities' => $activities
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
        if ($request->file('image')) {
            $path = $request->file('image')->store('courses', 'public'); // change to public_html 4 live, niet vergeten cuz anders not work:) x
            $data = $this->validateData($request);
            $data['image'] = '/' . 'storage/' . $path; // same thing here, uploads 4 live in plaats van storage. again niet vergeten cuz anders werkt het niet x
        } else {
            $data = $this->validateData($request);
        }
        // $data = $this->validateData($request);
        $course = Course::find($id);
        $course->update($data);
        return redirect(route('information.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $course = Course::find($id)->delete();
        return back();
    }

    protected function validateData(Request $request){
        $data = $request->validate([
            'name' => 'required',
            'abbreviation' => 'required',
            'image' => '',
            'information' => 'required',
            'careers' => 'required',
            'duration' => 'required',
            'internships' => 'required',
            'code' => 'required'
        ]);
        return $data;
    }
}
