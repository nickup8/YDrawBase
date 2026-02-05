// component-search.tsx
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { ComponentType, PropsResponse } from '@/types'; // ✅ Переименовываем тип
import { Head } from '@inertiajs/react';
import ComponentSearchTable from './component-search-table';

export default function ComponentSearch({
    components,
    searchValue,
}: {
    components: PropsResponse<ComponentType>; // ✅ Используем правильный тип
    searchValue: string;
}) {
    console.log(components.data);
    return (
        <AppLayout>
            <Head title="Поиск компонентов" />
            <Heading
                title={
                    components.data.length > 0
                        ? `Поиск по запросу "${searchValue}"`
                        : `По запросу "${searchValue}" ничего не найдено`
                }
            />

            {components.data.length > 0 && (
                <div className="mt-4">
                    <ComponentSearchTable data={components.data} />
                </div>
            )}
        </AppLayout>
    );
}
