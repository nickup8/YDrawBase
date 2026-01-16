import { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export const getFileAddLabel = (label: string): string => {
    const map: Record<string, { singular: string; gender: 'm' | 'f' | 'n' }> = {
        Чертеж: { singular: 'чертёж', gender: 'm' }, // мужской род
        Спецификация: { singular: 'спецификацию', gender: 'f' }, // женский род
        'Кримп-стандарт': { singular: 'кримп-стандарт', gender: 'm' }, // мужской род
        // Добавьте другие по необходимости
    };

    const entry = map[label];
    if (!entry) {
        // По умолчанию: считаем существительное мужским родом
        return `+ Добавить ещё один ${label.toLowerCase()}`;
    }

    const { singular, gender } = entry;
    let prefix;

    switch (gender) {
        case 'm': // мужской род
            prefix = 'один';
            break;
        case 'f': // женский род
            prefix = 'одну';
            break;
        case 'n': // средний род
            prefix = 'одно';
            break;
        default:
            prefix = 'один';
    }

    return `+ Добавить ещё ${prefix} ${singular}`;
};
