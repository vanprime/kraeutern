import { useGames } from '@/providers/games-provider';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';


const GameImage = ({ slug, name }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const cmsPath = process.env.VITE_CMS_PATH;

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
            className="aspect-square object-cover rounded-xl"
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
                <div key={game.slug} className="flex flex-col flex-grow flex-shrink-0 basis-40 min-h-56 max-w-96 justify-between">
                    <Link to={`/games/${game.slug}`} className='hover:outline rounded-xl my-2'>
                        <GameImage slug={game.slug} name={game.name} />
                    </Link>
                    <p className='text-xl mb-2'>{game.name}</p>
                    <p className='text-muted-foreground text-sm'>{game.description}</p>
                </div>
            ))}
        </>
    );
};

export default GamesList;