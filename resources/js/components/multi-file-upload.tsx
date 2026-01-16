// components/MultiFileUpload.tsx
import { getFileAddLabel } from '@/lib/utils';
import { useState } from 'react';
import SingleFileUpload from './single-file-upload';
import { Label } from './ui/label';
// ❗ Импортируем утилиту

interface MultiFileUploadProps {
    label: string; // ❗ Например: "Чертеж", "Спецификация"
    initialFiles: File[];
    onFilesChange: (files: File[]) => void;
}

export default function MultiFileUpload({
    label,
    initialFiles,
    onFilesChange,
}: MultiFileUploadProps) {
    const [files, setFiles] = useState<File[]>(initialFiles);
    const [fileStates, setFileStates] = useState<
        Array<{
            name: string | null;
            extension: string;
            size: string;
        }>
    >(
        initialFiles.map((file) => ({
            name: file.name,
            extension: file.name.split('.').pop()?.toUpperCase() || '',
            size:
                file.size > 1024 * 1024
                    ? `${(file.size / (1024 * 1024)).toFixed(2)} МБ`
                    : `${Math.round(file.size / 1024)} КБ`,
        })),
    );

    const handleFileChange = (file: File, index: number) => {
        const newFiles = [...files];
        const newStates = [...fileStates];

        newFiles[index] = file;
        newStates[index] = {
            name: file.name,
            extension: file.name.split('.').pop()?.toUpperCase() || '',
            size:
                file.size > 1024 * 1024
                    ? `${(file.size / (1024 * 1024)).toFixed(2)} МБ`
                    : `${Math.round(file.size / 1024)} КБ`,
        };

        setFiles(newFiles);
        setFileStates(newStates);
        onFilesChange(newFiles);
    };

    const handleAddFile = () => {
        // Проверяем, что последний файл загружен
        const lastFileState = fileStates[fileStates.length - 1];
        if (lastFileState && lastFileState.name) {
            // Добавляем новый пустой инпут
            const newFiles = [...files, null as unknown as File];
            const newStates = [
                ...fileStates,
                { name: null, extension: '', size: '' },
            ];

            setFiles(newFiles);
            setFileStates(newStates);
        }
    };

    const handleRemoveFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        const newStates = fileStates.filter((_, i) => i !== index);

        setFiles(newFiles);
        setFileStates(newStates);
        onFilesChange(newFiles);
    };

    // ❗ Проверяем, нужно ли показывать кнопку
    const shouldShowAddButton =
        fileStates.length > 0 && fileStates[fileStates.length - 1]?.name;

    return (
        <div className="mb-4">
            <Label htmlFor={`${label}-0`}>{label}</Label>
            <div className="mt-1 rounded-lg border border-dashed border-gray-300 p-3">
                {files.length > 0 ? (
                    files.map((_, index) => (
                        <SingleFileUpload
                            key={index}
                            label={`${label}-${index}`}
                            fileState={fileStates[index]}
                            onFileChange={(file) =>
                                handleFileChange(file, index)
                            }
                            onRemove={() => handleRemoveFile(index)}
                            showRemoveButton={!!fileStates[index].name}
                        />
                    ))
                ) : (
                    <SingleFileUpload
                        label={label}
                        fileState={{ name: null, extension: '', size: '' }}
                        onFileChange={(file) => handleFileChange(file, 0)}
                        onRemove={() => handleRemoveFile(0)}
                        showRemoveButton={false}
                    />
                )}
                {shouldShowAddButton && (
                    <button
                        type="button"
                        onClick={handleAddFile}
                        className="mt-2 cursor-pointer text-sm text-blue-500 hover:text-blue-700"
                    >
                        {getFileAddLabel(label)} {/* ❗ Используем утилиту */}
                    </button>
                )}
            </div>
        </div>
    );
}
