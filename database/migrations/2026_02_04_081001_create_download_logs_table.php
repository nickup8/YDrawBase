<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('download_logs', function (Blueprint $table) {
            $table->id();
            
            // Связь с файлом
            $table->foreignId('component_file_id')
                  ->constrained('component_files')
                  ->onDelete('cascade');
            
            // IP адрес скачивания
            $table->string('ip_address', 45); // IPv6 поддержка
            
            // Временная метка
            $table->timestamp('downloaded_at')->useCurrent();
            
            // Индексы для производительности
            $table->index('component_file_id');
            $table->index('downloaded_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('download_logs');
    }
};