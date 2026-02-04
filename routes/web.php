<?php

use App\Http\Controllers\ComponentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
    return Inertia::render('home', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    
});

require __DIR__.'/settings.php';
require __DIR__.'/components.php';
