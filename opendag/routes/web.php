<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\StoryController;
use App\Models\Building;
use App\Models\Category;
use App\Models\Floor;
use App\Models\Poi;
use App\Models\Setting;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $settings = Setting::find(1);
    $pois = Poi::with(['floor', 'category'])->get();
    $categories = Category::all();
    $floors = Floor::all();
    $buildings = Building::all();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'settings' => $settings,
        'pois' => $pois,
        'categories' => $categories,
        'floors' => $floors,
        'buildings' => $buildings
    ]);
});

// Route::get('/dashboard', function () {
//     // return Inertia::render('Dashboard');
//     // return route();
//     // Route::get('/')
//     return route('settings.index');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard/{type?}', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('course', CourseController::class)->except('index', 'show');
    Route::resource('story', StoryController::class)->except('index', 'show');
    Route::resource('activity', ActivityController::class)->except('index', 'show');
    Route::resource('/settings', SettingsController::class);

    Route::post('/dashboard/upload/{type}', [ImageController::class, 'store'])->name('image.store');

    Route::get('/nfc', function () {
        $pois = Poi::all();
        return Inertia::render('Nfc/Nfc', [
            'pois' => $pois
        ]);
    })->name('nfc');
});


Route::get('/information', [CourseController::class, 'index'])->name('information.index');
Route::get('/stories', [StoryController::class, 'index'])->name('stories.index');
Route::get('/activities', [ActivityController::class, 'index'])->name('activities.index');
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');

require __DIR__ . '/auth.php';
