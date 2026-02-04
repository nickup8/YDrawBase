// components/MultiFileUpload.tsx
import { getFileAddLabel } from '@/lib/utils';
import { useRef, useState } from 'react';
import SingleFileUpload from './single-file-upload';
import { Label } from './ui/label';

interface MultiFileUploadProps {
    label: string;
    initialFiles: File[];
    onFilesChange: (files: File[]) => void;
}

// Утилиты вынесены для читаемости
const formatFileSize = (size: number): string =>
    size > 1024 * 1024
        ? `${(size / (1024 * 1024)).toFixed(2)} МБ`
        : `${Math.round(size / 1024)} КБ`;

const getFileExtension = (filename: string): string =>
    filename.split('.').pop()?.toUpperCase() || '';

export default function MultiFileUpload({
    label,
    initialFiles,
    onFilesChange,
}: MultiFileUploadProps) {
    const [files, setFiles] = useState<File[]>(initialFiles);

    // Единый скрытый инпут для добавления НОВЫХ файлов
    const addFileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (file: File, index: number) => {
        const newFiles = [...files];
        newFiles[index] = file;
        setFiles(newFiles);
        onFilesChange(newFiles);
    };

    const handleRemoveFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        onFilesChange(newFiles);
    };

    // Ключевое изменение: при нажатии кнопки — сразу открываем диалог
    const handleAddFile = () => {
        addFileInputRef.current?.click();
    };

    // Обработчик выбора НОВОГО файла через скрытый инпут
    const handleNewFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const newFiles = [...files, file];
            setFiles(newFiles);
            onFilesChange(newFiles);

            // Сбрасываем значение инпута для повторного использования
            if (addFileInputRef.current) {
                addFileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className="mb-4">
            <Label>{label}</Label>
            <div className="mt-1 rounded-lg border border-dashed border-gray-300 p-3">
                {/* Рендерим существующие файлы */}
                {files.length > 0 ? (
                    files.map((file, index) => (
                        <SingleFileUpload
                            key={`${file.name}-${file.size}-${index}`}
                            label={`${label}-${index}`}
                            fileState={{
                                name: file.name,
                                extension: getFileExtension(file.name),
                                size: formatFileSize(file.size),
                            }}
                            onFileChange={(newFile) =>
                                handleFileChange(newFile, index)
                            }
                            onRemove={() => handleRemoveFile(index)}
                            showRemoveButton={true}
                        />
                    ))
                ) : (
                    // Если нет файлов — показываем первый инпут
                    <SingleFileUpload
                        key="initial"
                        label={label}
                        fileState={{ name: null, extension: '', size: '' }}
                        onFileChange={(file) => {
                            const newFiles = [file];
                            setFiles(newFiles);
                            onFilesChange(newFiles);
                        }}
                        onRemove={() => {}}
                        showRemoveButton={false}
                    />
                )}

                {/* Скрытый инпут ДЛЯ ДОБАВЛЕНИЯ НОВЫХ ФАЙЛОВ */}
                <input
                    type="file"
                    ref={addFileInputRef}
                    className="hidden"
                    onChange={handleNewFileSelect}
                    accept=".pdf,.dwg,.dxf,.jpg,.png,.jpeg"
                />

                {/* Кнопка всегда видна, если есть хотя бы один загруженный файл */}
                {files.length > 0 && (
                    <button
                        type="button"
                        onClick={handleAddFile}
                        className="mt-2 cursor-pointer text-sm text-blue-500 hover:text-blue-700"
                    >
                        {getFileAddLabel(label)}
                    </button>
                )}
            </div>
        </div>
    );
}
