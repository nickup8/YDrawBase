// components/single-file-upload.tsx
import { File, Upload, X } from 'lucide-react';
import { useRef } from 'react';
import { Button } from './ui/button';

// Цвета из логотипа
const COLORS = {
    primary: '#ED1C24', // Основной красный
    primaryLight: '#F8D7DA', // Светлый розовый фон
    primaryDark: '#C4161C', // Темный красный для ховера
    primaryHoverBg: '#FFF5F5', // Очень светлый фон при ховере
} as const;

interface SingleFileUploadProps {
    label: string;
    fileState: {
        name: string | null;
        extension: string;
        size: string;
    };
    onFileChange: (file: File) => void;
    onRemove: () => void;
    showRemoveButton: boolean;
}

export default function SingleFileUpload({
    label,
    fileState,
    onFileChange,
    onRemove,
    showRemoveButton,
}: SingleFileUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileChange(file);
        }
    };

    // Клик по любой области инпута открывает диалог
    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="mb-2">
            <div
                className={`flex cursor-pointer items-center justify-between rounded-md border-2 border-dashed px-3 py-2 transition-all duration-200 ${
                    fileState.name
                        ? 'border-gray-200 bg-white hover:border-[#ED1C24]'
                        : `border-gray-300 bg-white hover:border-[${COLORS.primary}] hover:bg-[${COLORS.primaryHoverBg}]`
                } `}
                onClick={handleClick}
            >
                <div className="flex min-w-0 flex-1 items-center space-x-3">
                    {/* Иконка */}
                    <div
                        className={`shrink-0 rounded-full p-2 ${
                            fileState.name
                                ? `bg-[${COLORS.primaryLight}] text-[${COLORS.primary}]`
                                : 'bg-gray-200 text-gray-600'
                        } `}
                    >
                        {fileState.name ? (
                            <File className="h-5 w-5" />
                        ) : (
                            <Upload className="h-5 w-5" />
                        )}
                    </div>

                    {/* Текст */}
                    <div className="min-w-0 flex-1">
                        {fileState.name ? (
                            <div className="truncate">
                                <span className="font-medium text-gray-900">
                                    {fileState.name}
                                </span>
                                <span className="ml-2 text-sm text-gray-500">
                                    ({fileState.extension}, {fileState.size})
                                </span>
                            </div>
                        ) : (
                            <div>
                                <span
                                    className="text-sm font-medium text-gray-500"
                                    // style={{ color: COLORS.primary }}
                                >
                                    Загрузить файл
                                </span>
                                {/* <p className="mt-0.5 text-xs text-gray-500">
                                    Кликните или перетащите файл
                                </p> */}
                            </div>
                        )}
                    </div>
                </div>

                {/* Кнопка удаления */}
                {showRemoveButton && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove();
                        }}
                        className="ml-2 h-8 w-8 shrink-0 p-0"
                        style={{
                            color: COLORS.primary,
                            backgroundColor: 'transparent',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                                COLORS.primaryLight;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                                'transparent';
                        }}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Скрытый инпут */}
            <input
                id={label}
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,.dwg,.dxf,.jpg,.png,.jpeg"
            />
        </div>
    );
}
