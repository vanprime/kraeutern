import Navigation from '@/components/Navigation';

import { useGames } from '@/providers/games-provider';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Navlayout = () => {
    const { loading } = useGames();
    return (
        <>
            <div className='px-6 py-4 w-full'>
                <Navigation />
            </div>
            <main className='flex flex-1 flex-col pb-6 px-6'>
                {loading ? <Loader2 className='animate-spin m-auto' /> : <Outlet />}
            </main>
        </>
    );
};

export default Navlayout;