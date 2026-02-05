<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComponentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'ypn' => $this->ypn,
            'supplier_pn' => $this->supplier_pn,
            'supplier' => $this->supplier,
            'description' => $this->description,
            
            // Счётчики файлов (если загружены через withCount)
            'drawings_count' => (int) $this->whenHas('drawings_count', $this->drawings_count),
            'specifications_count' => (int) $this->whenHas('specifications_count', $this->specifications_count),
            'crimp_standards_count' => (int) $this->whenHas('crimp_standards_count', $this->crimp_standards_count),
            
            // Файлы (если загружены через ->with('files'))
            'files' => $this->whenLoaded('files', function () {
                return $this->files->map(function ($file) {
                    return [
                        'id' => $file->id,
                        'type' => $file->type, // drawing, specification, crimp_standard
                        'original_name' => $file->original_name,
                        'extension' => $file->getExtension(),
                        'size_bytes' => $file->size,
                        'size_formatted' => $file->getFormattedSize(),
                        'mime_type' => $file->mime_type,
                        'created_at' => $file->created_at?->format('d.m.Y H:i'),
                        'download_url' => route('components.files.download', $file->id),
                    ];
                })->values();
            }),
            
            'created_at' => $this->created_at?->format('d.m.Y H:i'),
            'updated_at' => $this->updated_at?->format('d.m.Y H:i'),
        ];
    }
}