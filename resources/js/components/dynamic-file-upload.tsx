// components/DynamicFileUpload.tsx
import { CheckCircle, FileIcon, Upload } from 'lucide-react';
import { ChangeEvent } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface DynamicFileUploadProps {
    label: string;
    files: File[]; // ❗ Массив файлов
    onAddFile: (file: File) => void;
    onRemoveFile: (index: number) => void; // ❗ Удаление по индексу
    fileStates: Array<{ name: string; extension: string; size: string }>;
}

export default function DynamicFileUpload({
    label,
    files,
    onAddFile,
    onRemoveFile,
    fileStates,
}: DynamicFileUploadProps) {
    const handleFileChange = (
        e: ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            if (index === files.length) {
                onAddFile(file);
            } else {
                // ❗ Если файл уже был — обновляем его
                // (в реальном коде можно использовать более сложную логику)
            }
        }
    };

    const handleAddAnother = () => {
        // ❗ Для динамического добавления файла — открываем диалог выбора
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                onAddFile(file);
            }
        };
        input.click();
    };

    return (
        <div className="mb-4">
            <Label htmlFor={`${label}-0`}>{label}</Label>
            <div className="mt-1 space-y-2">
                {files.map((_, index) => {
                    const fileState = fileStates[index] || {
                        name: '',
                        extension: '',
                        size: '',
                    };
                    return (
                        <div
                            key={index}
                            className="rounded-lg border border-dashed border-gray-300 p-3"
                        >
                            {fileState.name ? (
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <FileIcon className="h-5 w-5 text-gray-500" />
                                            <div>
                                                <span className="text-sm font-medium">
                                                    {fileState.name}
                                                </span>
                                                <div className="text-xs text-gray-500">
                                                    {fileState.extension} •{' '}
                                                    {fileState.size}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onRemoveFile(index)
                                                }
                                                className="text-xs text-gray-500 hover:text-red-500"
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative flex items-center rounded-md border border-dashed border-gray-300 px-3 py-2">
                                    <Upload className="mr-2 h-4 w-4 text-gray-500" />
                                    <Input
                                        id={`${label}-${index}`}
                                        name={`${label}-${index}`}
                                        type="file"
                                        className="absolute w-full cursor-pointer opacity-0"
                                        onChange={(e) =>
                                            handleFileChange(e, index)
                                        }
                                    />
                                    <span className="text-sm text-gray-500">
                                        Выберите файл
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}
                <button
                    type="button"
                    onClick={handleAddAnother}
                    className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                >
                    + Добавить ещё один {label.toLowerCase()}
                </button>
            </div>
        </div>
    );
}
