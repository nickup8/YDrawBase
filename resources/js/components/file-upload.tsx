// components/FileUpload.tsx
import { CheckCircle, FileIcon, Upload } from 'lucide-react';
import { ChangeEvent } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface FileUploadProps {
    label: string;
    onFileChange: (file: File) => void;
    onRemove: () => void;
    fileState: {
        name: string | null;
        extension: string;
        size: string;
    };
}

export default function FileUpload({
    label,
    onFileChange,
    onRemove,
    fileState,
}: FileUploadProps) {
    const { name, extension, size } = fileState;

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileChange(file);
        }
    };

    return (
        <div className="mb-4">
            <Label htmlFor={label.toLowerCase()}>{label}</Label>
            <div className="mt-1 rounded-lg border border-dashed border-gray-300 p-3">
                {name ? (
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <FileIcon className="h-5 w-5 text-gray-500" />
                                <div>
                                    <span className="text-sm font-medium">
                                        {name}
                                    </span>
                                    <div className="text-xs text-gray-500">
                                        {extension} • {size}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <button
                                    type="button"
                                    onClick={onRemove}
                                    className="text-xs text-gray-500 hover:text-gray-700"
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
                            id={label.toLowerCase()}
                            name={label.toLowerCase()}
                            type="file"
                            className="absolute w-full cursor-pointer opacity-0"
                            onChange={handleFileChange}
                        />
                        <span className="text-sm text-gray-500">
                            Выберите файл
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
