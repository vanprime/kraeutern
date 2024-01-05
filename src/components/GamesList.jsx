import { useGames } from '@/providers/games-provider';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
const cmsPath = import.meta.env.VITE_CMS_PATH


export const GameImage = ({ slug, name, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = `${cmsPath}/gamelogos/${slug}.webp`;
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setHasError(true);
    }, [slug]);

    if (hasError) {
        return (
            <img
                src="${cmsPath}/gamelogos/default.webp"
                alt={name ? name : 'Kraeutern.'}
                className="aspect-square object-cover rounded-xl"
            />)
    }

    return isLoaded ? (
        <img
            src={`${cmsPath}/gamelogos/${slug}.webp`}
            alt={name}
            className={cn("aspect-square object-cover rounded-xl", className)}
        />
    ) : (
        <div className="aspect-square object-cover rounded-xl flex items-center justify-center">
            <Loader2 className='animate-spin' />
        </div>
    );
}

const GamesList = () => {
    const { games } = useGames()
    return (
        <>
            {games.map(game => (
                <div key={game.slug} className="flex flex-col flex-grow flex-shrink-0 basis-40 min-h-56 max-w-96">
                    <Link to={`/games/${game.slug}`} className='hover:outline rounded-xl my-2'>
                        <GameImage slug={game.slug} name={game.name} />
                    </Link>
                    <p className='text-xl mb-2 font-medium border-b-2'>{game.name}</p>
                    <p className='text-muted-foreground'>{game.description}</p>
                </div>
            ))}
        </>
    );
};

export default GamesList;