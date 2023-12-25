import useGames from '@/hooks/useGames';
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';


const Navigation = () => {

    const { games, loading } = useGames();

    return (
        <nav className='p-4 flex flex-row items-center min-h-4'>
            <Button asChild variant='link' className='text-sm text-muted-foreground'>
                <Link
                    className='text-sm text-muted-foreground'
                    to='/'
                >
                    Home
                </Link>
            </Button>
            {loading && (
                <>
                    <Skeleton className="w-[100px] h-[20px] mx-2 rounded-full" />
                    <Skeleton className="w-[100px] h-[20px] mx-2 rounded-full" />
                    <Skeleton className="w-[100px] h-[20px] mx-2 rounded-full" />
                    <Skeleton className="w-[100px] h-[20px] mx-2 rounded-full" />
                    <Skeleton className="w-[100px] h-[20px] mx-2 rounded-full" />
                </>
            )}
            {games.map(game => (
                <Button asChild variant='link' className='text-sm text-muted-foreground'>
                    <Link
                        to={`/games/${game.slug}`}
                        key={game.id}>
                        {game.name}
                    </Link>
                </Button>
            ))}
        </nav>
    );
};

export default Navigation;
