import CollapsibleSection from '@/components/collapsible-section';
import InputError from '@/components/input-error';
import MultiFileUpload from '@/components/multi-file-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { store } from '@/routes/components';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface FormData {
    ypn: string;
    supplier_pn: string;
    supplier: string;
    description: string;
    drawings: File[]; // ❗ Массив файлов
    specifications: File[]; // ❗
    crimp_standards: File[]; // ❗
}

export default function ComponentCreate({ success }: { success?: string }) {
    const { data, setData, submit, reset, errors } = useForm<FormData>({
        ypn: '',
        supplier_pn: '',
        supplier: '',
        description: '',
        drawings: [],
        specifications: [],
        crimp_standards: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(data);
        submit(store(), {
            onSuccess: () => {
                reset();
            },
        });
    };

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    return (
        <AppLayout>
            <Head title="Создание компонента" />
            <h1 className="mb-6 text-3xl font-bold">Создание компонента</h1>

            <form onSubmit={handleSubmit}>
                {/* Блок "Основная информация" */}
                <div className="mb-8 rounded-lg border border-gray-200 p-4">
                    <h2 className="mb-4 text-xl font-semibold">
                        Основная информация
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="ypn">Yazaki номер (YPN)</Label>
                            <Input
                                id="ypn"
                                name="ypn"
                                type="text"
                                onChange={(e) => setData('ypn', e.target.value)}
                                value={data.ypn}
                                className="mt-1"
                            />
                            <InputError message={errors.ypn} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="supplier_pn">
                                Номер поставщика (SPN)
                            </Label>
                            <Input
                                id="supplier_pn"
                                name="supplier_pn"
                                type="text"
                                onChange={(e) =>
                                    setData('supplier_pn', e.target.value)
                                }
                                value={data.supplier_pn}
                                className="mt-1"
                            />
                            <InputError
                                message={errors.supplier_pn}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="supplier">
                                Название поставщика
                            </Label>
                            <Input
                                id="supplier"
                                name="supplier"
                                type="text"
                                onChange={(e) =>
                                    setData('supplier', e.target.value)
                                }
                                value={data.supplier}
                                className="mt-1"
                            />
                            <InputError
                                message={errors.supplier}
                                className="mt-1"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="description">Описание</Label>
                        <Input
                            id="description"
                            name="description"
                            type="text"
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            value={data.description}
                            className="mt-1"
                        />
                    </div>
                </div>

                {/* Блок "Техническая документация" — управляемый */}
                <CollapsibleSection title="Техническая документация">
                    <MultiFileUpload
                        label="Чертеж" // ❗ Правильное имя
                        initialFiles={data.drawings}
                        onFilesChange={(files) => setData('drawings', files)}
                    />
                    <MultiFileUpload
                        label="Спецификация" // ❗ Правильное имя
                        initialFiles={data.specifications}
                        onFilesChange={(files) =>
                            setData('specifications', files)
                        }
                    />
                    <MultiFileUpload
                        label="Кримп-стандарт" // ❗ Правильное имя
                        initialFiles={data.crimp_standards}
                        onFilesChange={(files) =>
                            setData('crimp_standards', files)
                        }
                    />
                </CollapsibleSection>

                <Button
                    type="submit"
                    className="rounded-full bg-[#ED1C24] hover:bg-[#ED1C24]/80"
                >
                    Создать
                </Button>
            </form>
        </AppLayout>
    );
}
