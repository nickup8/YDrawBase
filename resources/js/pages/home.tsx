import { index } from '@/actions/App/Http/Controllers/ComponentController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

import { Head, useForm } from '@inertiajs/react';
import { SendHorizonal } from 'lucide-react';

export default function Home() {
    const { data, setData, submit } = useForm({
        searchType: 'ypn',
        searchValue: '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Обработка формы
        submit(index());
    };

    return (
        <AppLayout>
            <Head title="База компонентов" />

            <div className="absolute top-1/2 left-1/2 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 text-center">
                <h1 className="mb-4 text-3xl font-bold">База компонентов</h1>
                <form
                    className="relative rounded-full bg-gray-100"
                    onSubmit={onSubmit}
                >
                    <div className="absolute top-0 left-0 w-22">
                        <Select
                            value={data.searchType}
                            onValueChange={(e) => setData('searchType', e)}
                        >
                            <SelectTrigger className="w-full cursor-pointer rounded-l-full rounded-tr-none rounded-br-none py-10 pl-6 font-bold">
                                <SelectValue placeholder="Тип поиска" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    className="cursor-pointer"
                                    value="ypn"
                                >
                                    YPN
                                </SelectItem>
                                <SelectItem
                                    className="cursor-pointer"
                                    value="spn"
                                >
                                    SPN
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Input
                        className="rounded-full py-10 pr-12 pl-26 placeholder:text-lg placeholder:text-gray-500 focus:border-transparent focus:text-lg focus:ring-0 md:text-lg placeholder:dark:text-gray-400"
                        placeholder="Введите номер компонента"
                        value={data.searchValue}
                        onChange={(e) => setData('searchValue', e.target.value)}
                    />
                    <Button
                        className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full bg-[#ED1C24] py-7 text-white hover:bg-[#ED1C24]/80"
                        variant={'link'}
                        disabled={!data.searchValue}
                        type="submit"
                    >
                        <SendHorizonal className="size-8" />
                    </Button>
                    {/* {data.searchValue && (
                        
                    )} */}
                </form>
            </div>
        </AppLayout>
    );
}
