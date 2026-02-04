import AppLogo from '@/components/app-logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { home } from '@/routes';
import components from '@/routes/components';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { type ReactNode } from 'react';
import { Toaster } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    return (
        <div className="relative min-h-screen">
            <header className="flex items-center justify-between px-7 pt-6">
                <Link href={home()}>
                    <AppLogo />
                </Link>
                <div className="flex items-center space-x-6">
                    <div>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="size-10 rounded-full p-1 text-gray-400 transition-colors duration-200 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                                    asChild
                                >
                                    <Link href={components.create()}>
                                        <Plus className="size-6" />
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Создать компонент</TooltipContent>
                        </Tooltip>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="size-10 cursor-pointer rounded-full p-1"
                            >
                                <Avatar className="size-11 overflow-hidden rounded-full">
                                    <AvatarImage
                                        src={auth.user.avatar}
                                        alt={auth.user.name}
                                    />
                                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                        {auth.user.name[0] +
                                            auth.user.surname[0]}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                            <UserMenuContent user={auth.user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <main className="mx-auto w-full max-w-7xl py-6">{children}</main>
            <Toaster position="bottom-right" richColors closeButton />
        </div>
    );
};
