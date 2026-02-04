<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DownloadLog extends Model
{
    protected $fillable = [
        'component_file_id',
        'ip_address',
        'downloaded_at',
    ];

    protected $casts = [
        'downloaded_at' => 'datetime',
    ];

    /**
     * Связь с файлом
     */
    public function file()
    {
        return $this->belongsTo(ComponentFile::class, 'component_file_id');
    }

    /**
     * Получить компонент через файл
     */
    public function getComponentAttribute()
    {
        return $this->file?->component;
    }
}
