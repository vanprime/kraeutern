import { useGames } from '@/providers/games-provider';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

const GamesList = () => {
    const { games } = useGames()
    return (
        <>
            {games.map(game => (
                <div key={game.slug} className="flex flex-col flex-grow flex-shrink-0 basis-40 min-h-56 p-4 rounded-md bg-muted">
                    <p className='text-xl'>{game.name}</p>
                    <p className='text-muted-foreground text-sm'>{game.description}</p>
                    <div className="mt-auto" >
                        <Button asChild className="w-full">
                            <Link to={`/games/${game.slug}`}><Play /></Link>
                        </Button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default GamesList;