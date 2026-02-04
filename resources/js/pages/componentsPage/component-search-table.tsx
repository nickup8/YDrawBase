import { DataTable } from '@/components/data-table';
import { ComponentType } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export default function ComponentSearchTable({
    data,
}: {
    data: ComponentType[];
}) {
    const columns: ColumnDef<ComponentType>[] = [
        {
            header: 'Yazaki номер (YPN)',
            accessorKey: 'ypn',
        },
        {
            header: 'Номер поставщика (SPN)',
            accessorKey: 'supplier_pn',
        },
        {
            header: 'Поставщик',
            accessorKey: 'supplier',
        },
        {
            header: 'Дата создания',
            accessorKey: 'created_at',
            cell: ({ row }) =>
                new Date(row.original.created_at).toLocaleString('ru-RU', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                }),
        },
        {
            header: 'Дата обновления',
            accessorKey: 'updated_at',
            cell: ({ row }) =>
                new Date(row.original.updated_at).toLocaleString('ru-RU', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                }),
        },
    ];

    return <DataTable columns={columns} data={data} />;
}
