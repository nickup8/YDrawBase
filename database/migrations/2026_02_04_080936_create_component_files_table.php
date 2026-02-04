<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('component_files', function (Blueprint $table) {
            $table->id();
            
            // Связь с компонентом
            $table->foreignId('component_id')
                  ->constrained('components')
                  ->onDelete('cascade'); // При удалении компонента - удаляются все файлы
            
            // Информация о файле
            $table->string('path');                    // Путь к файлу в хранилище
            $table->string('original_name', 500);      // Оригинальное имя файла
            $table->string('mime_type', 100);          // MIME тип
            
            // Тип файла
            $table->enum('type', [
                'drawing',           // Чертеж
                'specification',     // Спецификация
                'crimp_standard',    // Кримп-стандарт
            ]);
            
            // Размер файла в байтах
            $table->unsignedBigInteger('size');
            
            // Временные метки
            $table->timestamps();
            
            // Индексы для производительности
            $table->index('component_id');
            $table->index('type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('component_files');
    }
};