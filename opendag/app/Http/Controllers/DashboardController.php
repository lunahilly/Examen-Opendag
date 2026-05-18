<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Course;
use App\Models\Setting;
use App\Models\Story;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index($type = 'courses'){
        // dd($type);
        $settings = Setting::find(1);
        $data = null;
        if($type == 'courses'){
            $data = Course::paginate(10);
        }
        else if($type == 'stories'){
            $data = Story::paginate(10);
        }
        else if($type == 'activities'){
            $data = Activity::with('activityType')->paginate(10);
        }
        // $courses = Course::paginate(10);
        // $stories = Story::paginate(10);
        // $activities = Activity::paginate(10);
        return Inertia::render('Dashboard', [
            'settings' => $settings,
            // 'courses' => $courses,
            // 'stories' => $stories,
            // 'activities' => $activities,
            'type' => $type,
            'data' => $data
        ]);
    }
}
