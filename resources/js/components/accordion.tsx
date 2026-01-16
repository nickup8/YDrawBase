// components/Accordion.tsx
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface AccordionProps {
    title: string;
    children: React.ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-6 rounded-lg border border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between px-4 py-3 text-left font-semibold hover:bg-gray-50"
            >
                {title}
                {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
            </button>
            {isOpen && <div className="px-4 pt-2 pb-4">{children}</div>}
        </div>
    );
}
