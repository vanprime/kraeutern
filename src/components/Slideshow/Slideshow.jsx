// Quiz component
import useQuiz from '@/hooks/useQuiz';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Overshooter from '@/components/Overshooter';

const Slideshow = ({ game }) => {

    const pausePoints = [26]; // Define your pause points
    const { questions,
        gameState,
        setGameState,
        goToNextQuestion,
        goToPreviousQuestion,
        loading,
    } = useQuiz(game, pausePoints);

    const [imgSrc, setImgSrc] = useState('');

    const toggleSolution = () => {
        if (!gameState.isPaused) {
            setGameState({ ...gameState, showSolution: !gameState.showSolution })
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                goToNextQuestion();
            } else if (e.key === 'ArrowLeft') {
                goToPreviousQuestion();
            } else if (e.key === ' ') { // Listen for the 'Space' key
                toggleSolution();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState]);

    useEffect(() => {
        if (gameState.currentQuestionIndex >= 0 && questions.length > 0) {
            setImgSrc(questions[gameState.currentQuestionIndex].question);
        }
    }, [gameState?.currentQuestionIndex, questions]);

    return (
        <>
            <Overshooter />
            {questions.length > 0 && (
                <div className='flex flex-1 flex-col'>
                    <div className='py-9 px-16 grid grid-rows-2 rounded bg-gradient-light-blue bg-180 animate-gradient-animation flex-1'>
                        <div className='flex flex-1 flex-col justify-between'>
                            <div className="flex flex-row text-muted-foreground text-xl">
                                <p className='mr-[0.5ch]'>
                                    Question
                                </p>
                                <motion.p
                                    key={gameState.currentQuestionIndex}  // Add the key prop
                                    initial={{ y: '0.5ch', opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {gameState.currentQuestionIndex + 1}
                                </motion.p>
                            </div>
                            <img src={imgSrc} />
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            {gameState.showSolution && (
                                <motion.p
                                    key={gameState.showSolution}
                                    initial={{ x: '2ch', opacity: 0, scale: 0.99, }}
                                    animate={{ x: 0, opacity: 1, scale: 1, }}
                                    transition={{ duration: 0.25 }}
                                    className='font-semibold text-[3rem] text-purple-700'>
                                    {questions[gameState.currentQuestionIndex].solution}
                                </motion.p>
                            )
                            }
                        </div>
                    </div >
                    <div className='pt-4 flex justify-between mt-auto'>
                        <Button
                            variant="secondary"
                            onClick={goToPreviousQuestion}
                            disabled={gameState.currentQuestionIndex === 0}>
                            <ArrowLeft />
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={toggleSolution}>
                            {gameState.showSolution ? 'Hide Solution' : 'Show Solution'}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={goToNextQuestion}
                            disabled={gameState.currentQuestionIndex === questions.length - 1}
                        >
                            <ArrowRight />
                        </Button>
                    </div>
                </div >
            )}
        </ >
    );
};

export default Slideshow;
