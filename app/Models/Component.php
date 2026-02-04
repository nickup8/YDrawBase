<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Component extends Model
{
    protected $fillable = [
        'supplier',
        'supplier_pn',
        'description',
        'ypn',
    ];

    /**
     * Связь с файлами компонента
     */
    public function files(): HasMany
    {
        return $this->hasMany(ComponentFile::class);
    }

    /**
     * Чертежи компонента
     */
    public function drawings()
    {
        return $this->files()->where('type', 'drawing');
    }

    /**
     * Спецификации компонента
     */
    public function specifications()
    {
        return $this->files()->where('type', 'specification');
    }

    /**
     * Кримп-стандарты компонента
     */
    public function crimpStandards()
    {
        return $this->files()->where('type', 'crimp_standard');
    }

    /**
     * Получить все файлы сгруппированные по типу
     */
    public function getFilesByType(): array
    {
        return [
            'drawings' => $this->drawings()->get(),
            'specifications' => $this->specifications()->get(),
            'crimp_standards' => $this->crimpStandards()->get(),
        ];
    }

    /**
     * Подсчёт файлов по типу
     */
    public function getFileCountsAttribute(): array
    {
        return [
            'drawings' => $this->drawings()->count(),
            'specifications' => $this->specifications()->count(),
            'crimp_standards' => $this->crimpStandards()->count(),
            'total' => $this->files()->count(),
        ];
    }
}
