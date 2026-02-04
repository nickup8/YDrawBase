<?php

use App\Http\Controllers\ComponentController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
   Route::get('components', [ComponentController::class, 'index'])->name('components.index'); 
   Route::get('components/create', [ComponentController::class, 'create'])->name('components.create');
    Route::post('components', [ComponentController::class, 'store'])->name('components.store');
});