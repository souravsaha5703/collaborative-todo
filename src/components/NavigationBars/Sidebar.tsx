import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PanelsTopLeft } from 'lucide-react';
import { ClipboardList } from 'lucide-react';
import { ChartNoAxesCombined } from 'lucide-react';
import { HeartHandshake } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { ModeToggle } from '../Theme/Mode-toggle';
import { useAppSelector } from '../../hooks/redux-hooks';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidebar: React.FC = () => {
    const user = useAppSelector((state) => state.user.currentUser);
    return (
        <nav className='p-2 fixed z-50 left-0 bottom-0 w-full bg-background drop-shadow-2xl overflow-hidden max-md:rounded-t-2xl md:rounded-r-2xl md:top-0 md:bottom-auto md:w-20 md:h-screen'>
            <div className='w-full h-full rounded-r-xl flex gap-4 items-center md:flex-col md:py-4 max-md:justify-center max-md:flex-row-reverse'>
                <NavLink to={'/user/profile'}>
                    <Avatar className='max-md:size-7'>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </NavLink>
                <p className='text-sm text-center font-noto font-normal max-md:hidden'>{user?.fullname}</p>
                <div className='flex gap-2 items-center justify-center md:w-full md:flex-col md:py-4'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <NavLink to={'/user/dashboard'} className={"text-gray-600 dark:text-gray-100 hover:bg-orange-500 hover:text-gray-100 hover:dark:slate-gray-50 p-2 rounded-md"}><PanelsTopLeft className='size-6 md:size-7' /></NavLink>
                            </TooltipTrigger>
                            <TooltipContent side='right' align='end' sideOffset={10} alignOffset={5} className='font-noto font-normal'>
                                <p>Dashboard</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <NavLink to={'/user/all_todos'} className={"text-gray-600 dark:text-gray-100 hover:bg-orange-500 hover:text-gray-100 hover:dark:slate-gray-50 p-2 rounded-md"}><ClipboardList className='size-6 md:size-7' /></NavLink>
                            </TooltipTrigger>
                            <TooltipContent side='right' align='end' sideOffset={10} alignOffset={5} className='font-noto font-normal'>
                                <p>Tasks</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <NavLink to={'/user/analytics'} className={"text-gray-600 dark:text-gray-100 hover:bg-orange-500 hover:text-gray-100 hover:dark:slate-gray-50 p-2 rounded-md"}><ChartNoAxesCombined className='size-6 md:size-7' /></NavLink>
                            </TooltipTrigger>
                            <TooltipContent side='right' align='end' sideOffset={10} alignOffset={5} className='font-noto font-normal'>
                                <p>Analytics</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <NavLink to={'/user/teams'} className={"text-gray-600 dark:text-gray-100 hover:bg-orange-500 hover:text-gray-100 hover:dark:slate-gray-50 p-2 rounded-md"}><HeartHandshake className='size-6 md:size-7' /></NavLink>
                            </TooltipTrigger>
                            <TooltipContent side='right' align='end' sideOffset={10} alignOffset={5} className='font-noto font-normal'>
                                <p>Team Collaboration</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </div>
                <ModeToggle />
            </div>
        </nav>
    )
}

export default Sidebar;