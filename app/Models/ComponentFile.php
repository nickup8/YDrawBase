<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ComponentFile extends Model
{
    protected $fillable = [
        'component_id',
        'path',
        'original_name',
        'mime_type',
        'type',
        'size',
    ];

    protected $casts = [
        'size' => 'integer',
    ];

    /**
     * Связь с компонентом
     */
    public function component()
    {
        return $this->belongsTo(Component::class);
    }

    /**
     * Связь с логами скачиваний
     */
    public function downloadLogs()
    {
        return $this->hasMany(DownloadLog::class, 'component_file_id');
    }

    /**
     * Получить содержимое файла
     */
    public function getContent()
    {
        return Storage::disk('components')->get($this->path);
    }

    /**
     * Получить путь к файлу для скачивания
     */
    public function getStoragePath()
    {
        return Storage::disk('components')->path($this->path);
    }

    /**
     * Проверить, является ли файл изображением
     */
    public function isImage(): bool
    {
        return in_array($this->mime_type, [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
        ]);
    }

    /**
     * Проверить, является ли файл документом (PDF, DWG и т.д.)
     */
    public function isDocument(): bool
    {
        return in_array($this->mime_type, [
            'application/pdf',
            'application/acad',
            'application/dwg',
            'application/dxf',
            'image/vnd.dwg',
            'image/vnd.dxf',
        ]);
    }

    /**
     * Получить человекочитаемый размер файла
     */
    public function getFormattedSize(): string
    {
        $size = $this->size;
        
        if ($size > 1024 * 1024) {
            return number_format($size / (1024 * 1024), 2) . ' МБ';
        }
        
        return number_format($size / 1024, 0) . ' КБ';
    }

    /**
     * Получить расширение файла
     */
    public function getExtension(): string
    {
        $parts = explode('.', $this->original_name);
        return strtoupper(end($parts));
    }

    /**
     * Получить имя файла без расширения
     */
    public function getFileNameWithoutExtension(): string
    {
        $parts = explode('.', $this->original_name);
        array_pop($parts);
        return implode('.', $parts);
    }

    /**
     * Записать лог скачивания
     */
    public function logDownload(): void
    {
        $this->downloadLogs()->create([
            'ip_address' => request()->ip(),
            'downloaded_at' => now(),
        ]);
    }
}
