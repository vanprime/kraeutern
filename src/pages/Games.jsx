import Navigation from '@/components/Navigation';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Games = () => {
    return (
        <>
            <main className='flex flex-1 pb-6 px-6'>
                <div className='flex flex-1 items-center bg-slate-800 rounded-3xl flex-col p-9'>
                    Games
                </div>
            </main>
        </>
    );
};

export default Games;