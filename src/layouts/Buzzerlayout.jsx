import React from 'react';
import { Outlet } from 'react-router-dom';

const Buzzerlayout = () => {
    return (
        <>
            <main className='flex flex-1 flex-col pb-6 px-6'>
                <Outlet />
            </main>
        </>
    );
};

export default Buzzerlayout;