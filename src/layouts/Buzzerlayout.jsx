import { useGamestateContext } from '@/providers/gamestate-provider';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Buzzerlayout = () => {
    const { gameId } = useGamestateContext();

    return (
        <>
            {gameId && (
                <div className="w-full text-center text-sm px-6 py-2 bg-green-900">
                    <p> Subscribed to Game ID: {gameId}</p>
                </div>
            )}
            {!gameId && (
                <div className="w-full text-center text-sm px-6 py-2 bg-destructive space-x-4">
                    <p className='inline-block'> No active game!</p> <Link to="/" className='inline-block hover:underline'> go back and join a game</Link>
                </div>
            )}
            <main className='flex flex-1 flex-col pb-6'>
                <Outlet />
            </main>
        </>
    );
};

export default Buzzerlayout;