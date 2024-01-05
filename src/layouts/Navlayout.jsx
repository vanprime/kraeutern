import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { useGamestateContext } from '@/providers/gamestate-provider';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Navlayout = () => {
    const { loading } = useGamestateContext();
    return (
        <>
            <div className='flex flex-col min-h-[100dvh]'>
                <Navigation />
                <main className='flex flex-1 flex-col pb-6 px-6'>
                    {loading ? (
                        <Loader2 className='animate-spin m-auto' />
                    ) : (
                        <Outlet />
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Navlayout;