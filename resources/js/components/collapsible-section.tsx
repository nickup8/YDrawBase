// components/CollapsibleSection.tsx
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
    isOpen?: boolean; // Управляемое состояние
    onToggle?: (isOpen: boolean) => void; // Опциональный обработчик переключения
}

export default function CollapsibleSection({
    title,
    children,
    isOpen = false,
    onToggle,
}: CollapsibleSectionProps) {
    const [isExpanded, setIsExpanded] = useState(isOpen);

    const toggle = () => {
        const newState = !isExpanded;
        setIsExpanded(newState);
        onToggle?.(newState); // ❗ Передаём новое состояние во внешний обработчик
    };

    return (
        <div className="mb-6 rounded-lg border border-gray-200">
            <div
                onClick={toggle}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-left font-semibold hover:bg-gray-50"
            >
                {title}
                {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
            </div>
            {isExpanded && <div className="px-4 pt-2 pb-4">{children}</div>}
        </div>
    );
}
