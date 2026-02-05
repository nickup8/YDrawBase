<?php

use App\Http\Controllers\ComponentController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
   Route::get('/components/search', [ComponentController::class, 'index'])
        ->name('components.search');
    
    // Создание компонента
    Route::get('/components/create', [ComponentController::class, 'create'])
        ->name('components.create');
    Route::post('/components', [ComponentController::class, 'store'])
        ->name('components.store');
    
    // Просмотр компонента
    Route::get('/components/{id}', [ComponentController::class, 'show'])
        ->name('components.show');
    
    // Редактирование компонента
    Route::get('/components/{id}/edit', [ComponentController::class, 'edit'])
        ->name('components.edit');
    Route::put('/components/{id}', [ComponentController::class, 'update'])
        ->name('components.update');
    
    // Удаление компонента
    Route::delete('/components/{id}', [ComponentController::class, 'destroy'])
        ->name('components.destroy');
    
    // Файлы компонента
    Route::get('/components/files/{fileId}/download', [ComponentController::class, 'downloadFile'])
        ->name('components.files.download');
    
    Route::delete('/components/files/{fileId}', [ComponentController::class, 'deleteFile'])
        ->name('components.files.delete');
});