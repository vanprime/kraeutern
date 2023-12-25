import Navigation from '@/components/Navigation';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Navlayout = () => {
    return (
        <>
            <Navigation />
            <main className='flex flex-1 pb-6 px-6'>
                <div className='flex flex-1 items-center bg-slate-800 rounded-3xl flex-col p-9'>
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default Navlayout;