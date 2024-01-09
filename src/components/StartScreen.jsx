// StartScreen.jsx
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { GameImage } from '@/components/GamesList';
import { useGames } from '@/providers/games-provider';
import { Globe, Monitor } from 'lucide-react';
import useRemoteGame from '@/hooks/useRemoteGame';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

const StartScreen = () => {

    const { games } = useGames();
    const { gameSlug } = useParams();
    const game = games.find(game => game?.slug === gameSlug);
    const { handleUpdateCurrentGameId } = useRemoteGame();

    const navigate = useNavigate();
    const savedGame = localStorage.getItem(game?.slug); // Check for saved game

    const handleNewLocalGame = () => {
        localStorage.removeItem(game.slug); // Clear saved game data
        navigate(`/games/${game.slug}/play-locally`);
    };

    const handleContinueLocalGame = () => {
        navigate(`/games/${game.slug}/play-locally`);
    };

    const handleHostOnline = async () => {
        const updateSuccess = await handleUpdateCurrentGameId(game.id);
        if (updateSuccess) {
            navigate(`/host/${game.id}`);
        } else {
            console.error('Failed to update game ID');
        }
    }

    if (!game) return null;

    return (
        <div className='flex flex-wrap gap-6 justify-center m-auto rounded-xl text-center'>
            <motion.div
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                transition={{ duration: 0.5 }}>
                <GameImage slug={game.slug} name={game.name} className="w-full max-w-96 flex flex-1" />
            </motion.div>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='font-semibold text-[3rem] text-slate-50'>{game.name}</h1>
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                >
                    {game.description && <p className='text-muted-foreground'>{game.description}</p>}
                </motion.div>
                <div className='flex justify-center mt-9 gap-4'>
                    <div className='flex flex-col gap-4'>
                        <Button onClick={handleNewLocalGame}>Play locally<Monitor className='ml-[1ch]' /></Button>
                        {savedGame && <Button variant="secondary" onClick={handleContinueLocalGame}>Continue local Game</Button>}
                    </div>
                    <Button onClick={handleHostOnline}>Host online<Globe className='ml-[1ch]' /></Button>
                </div>
            </div>
        </div>
    );
};

export default StartScreen;
