import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGames } from '@/providers/games-provider';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { RotateCcw, Terminal } from 'lucide-react';


const Navigation = () => {

    const { games, loading, error } = useGames();
    let { gameSlug } = useParams(); // Access the dynamic part of the URL

    const resetGame = (slug) => {
        localStorage.removeItem(slug);
    }

    const resetAllGames = () => {
        games.forEach(game => {
            localStorage.clear(game.slug);
        });
    }

    return (
        <nav className='px-4 py-2 flex flex-row items-center min-h-4'>
            <Button asChild variant='link' className='text-sm text-muted-foreground'>
                <Link
                    className='text-sm text-muted-foreground'
                    to='/games'
                >
                    All Games
                </Link>
            </Button>
            {loading && (
                <>
                    <Skeleton className="w-[100px] h-[16px] mx-2 rounded-full" />
                    <Skeleton className="w-[100px] h-[16px] mx-2 rounded-full" />
                    <Skeleton className="w-[100px] h-[16px] mx-2 rounded-full" />
                    <Skeleton className="w-[100px] h-[16px] mx-2 rounded-full" />
                    <Skeleton className="w-[100px] h-[16px] mx-2 rounded-full" />
                </>
            )}
            {error && (
                <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Oops!</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>
            )}
            {games.map(game => (
                <Button key={game.id} asChild variant='link' className='text-sm text-muted-foreground'>
                    <Link
                        to={`/games/${game.slug}`}
                    >
                        {game.name}
                    </Link>
                </Button>
            ))}
            <div className='ml-auto space-x-2'>
                <Button variant="secondary" onClick={() => { resetAllGames() }} className="ml-auto">
                    <RotateCcw className='mr-2' /> all
                </Button>
                <Button variant="secondary" onClick={() => { resetGame(gameSlug); }} className="ml-auto">
                    <RotateCcw className='mr-2' /> current
                </Button>
            </div>
        </nav>
    );
};

export default Navigation;
