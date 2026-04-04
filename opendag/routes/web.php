<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route::get('/course', [CourseController::class, 'create'])->named('course.create');
    // Route::post('/course', [CourseController::class, 'store'])->named('course.store');
    // Route::get('/course/{id}', [CourseController::class, 'edit'])->named('course.edit');
    // Route::patch('/course/{id}', [CourseController::class, 'update'])->named('course.update');

    Route::resource('course', CourseController::class)->except('index', 'show');
    Route::resource('story', StoryController::class)->except('index', 'show');
});


Route::get('/information', [CourseController::class, 'index'])->name('information.index');
Route::get('/stories', [StoryController::class, 'index'])->name('stories.index');

require __DIR__.'/auth.php';
