import Navigation from '@/components/Navigation';

import { useGames } from '@/providers/games-provider';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Navlayout = () => {
    const { loading } = useGames();
    return (
        <>
            <Navigation />
            <main className='flex flex-1 pb-6 px-6'>
                {loading ? <Loader2 className='animate-spin m-auto' /> : <Outlet />}
            </main>
        </>
    );
};

export default Navlayout;