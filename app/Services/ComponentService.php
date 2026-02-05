<?php

namespace App\Services;

use App\Models\Component;
use App\Models\ComponentFile;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ComponentService
{
    /**
     * Сохранение базовой информации о компоненте
     */
    public function storeBasicInformation(array $data): Component
    {
        return Component::create([
            'ypn' => $data['ypn'],
            'supplier_pn' => $data['supplier_pn'],
            'supplier' => $data['supplier'],
            'description' => $data['description'],
        ]);
    }

    /**
     * Сохранение файлов компонента
     */
    public function storeFiles(Component $component, array $filesData): void
    {
        // Сохранение чертежей
        if (!empty($filesData['drawings'])) {
            $this->saveFiles($component, $filesData['drawings'], 'drawing');
        }

        // Сохранение спецификаций
        if (!empty($filesData['specifications'])) {
            $this->saveFiles($component, $filesData['specifications'], 'specification');
        }

        // Сохранение кримп-стандартов
        if (!empty($filesData['crimp_standards'])) {
            $this->saveFiles($component, $filesData['crimp_standards'], 'crimp_standard');
        }
    }

    /**
     * Сохранение файлов определённого типа
     */
    private function saveFiles(Component $component, array $files, string $type): void
    {
        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $this->saveSingleFile($component, $file, $type);
            }
        }
    }

    /**
     * Сохранение одного файла
     */
    private function saveSingleFile(Component $component, UploadedFile $file, string $type): ComponentFile
    {
        // Создаём директорию для компонента
        $directory = "components/{$component->id}/{$type}";
        
        // Сохраняем файл в приватное хранилище
        $path = $file->store($directory, 'components');

        // Создаём запись в базе данных
        return ComponentFile::create([
            'component_id' => $component->id,
            'path' => $path,
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'type' => $type,
            'size' => $file->getSize(),
        ]);
    }

    /**
     * Поиск по YPN
     */
    public function searchYpn(string $searchValue)
    {
        return Component::where('ypn', 'like', "%{$searchValue}%")
            ->withCount(['drawings', 'specifications', 'crimpStandards'])
            ->get();
    }

    /**
     * Поиск по номеру поставщика (SPN)
     */
    public function searchSpn(string $searchValue)
    {
        return Component::where('supplier_pn', 'like', "%{$searchValue}%")
            ->withCount(['drawings', 'specifications', 'crimpStandards'])
            ->get();
    }

    /**
     * Получение компонента с файлами
     */
    public function getComponentWithFiles(int $id): Component
    {
        return Component::with(['files' => function ($query) {
            $query->orderBy('type')->orderBy('created_at', 'desc');
        }])->findOrFail($id);
    }

    /**
     * Скачивание файла компонента
     */
    public function downloadFile(int $fileId)
    {
        $file = ComponentFile::findOrFail($fileId);
        
        // Логирование скачивания
        $file->logDownload();
        
        // Возвращаем файл для скачивания
        return Storage::disk('components')->download(
            $file->path,
            $file->original_name
        );
    }

    /**
     * Удаление файла компонента
     */
    public function deleteFile(int $fileId): bool
    {
        $file = ComponentFile::findOrFail($fileId);
        
        // Удаляем файл из хранилища
        if (Storage::disk('components')->exists($file->path)) {
            Storage::disk('components')->delete($file->path);
        }
        
        // Удаляем запись из базы данных
        return $file->delete();
    }

    /**
     * Обновление информации о компоненте
     */
    public function updateComponent(int $id, array $data): Component
    {
        $component = Component::findOrFail($id);
        
        $component->update([
            'supplier' => $data['supplier'] ?? $component->supplier,
            'supplier_pn' => $data['supplier_pn'] ?? $component->supplier_pn,
            'description' => $data['description'] ?? $component->description,
        ]);
        
        return $component;
    }
}