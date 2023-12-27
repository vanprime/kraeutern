// StartScreen.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import SpellingText from '@/components/SpellingText';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};
const StartScreen = ({ game }) => {
    const navigate = useNavigate();
    const savedGame = localStorage.getItem(game.slug); // Check for saved game

    const handleNewGame = () => {
        localStorage.removeItem(game.slug); // Clear saved game data
        navigate(`/games/${game.slug}/play`);
    };

    const handleContinueGame = () => {
        navigate(`/games/${game.slug}/play`);
    };


    return (
        <div className='flex flex-col p-9 my-auto bg-muted rounded-xl text-center mx-auto bg-gradient-to-b from-cyan-950 to-purple-950 shadow-2xl shadow-purple-800 border-2 border-slate-50'>
            <SpellingText text={game.name} fontClasses='font-semibold tracking-wide text-[8rem] text-slate-50 inline-block' />
            <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
            >
                {game.description && <p className='text-muted-foreground'>{game.description}</p>}
            </motion.div>
            <div className='flex justify-center mt-9 space-x-4'>
                <Button onClick={handleNewGame}>New Game</Button>
                {savedGame && <Button onClick={handleContinueGame}>Continue Game</Button>}
            </div>
        </div>
    );
};

export default StartScreen;
