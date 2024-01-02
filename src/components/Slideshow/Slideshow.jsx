// Quiz component
import useQuiz from '@/hooks/useQuiz';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Overshooter from '@/components/Overshooter';
import { useGamestateContext } from '@/providers/gamestate-provider';

const Slideshow = ({ game }) => {

    const { overshooterVisible, activeTeamId } = useGamestateContext();

    const pausePoints = [26]; // Define your pause points
    const { questions,
        currentQuestionIndex,
        goToNextQuestion,
        goToPreviousQuestion,
        showSolution,
        setShowSolution,
        isPaused,
    } = useQuiz(game, pausePoints);

    const [imgSrc, setImgSrc] = useState('');

    const toggleSolution = () => {
        if (!isPaused) {
            setShowSolution(!showSolution)
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
    }, [goToNextQuestion, goToPreviousQuestion, toggleSolution, currentQuestionIndex, isPaused]);

    useEffect(() => {
        if (currentQuestionIndex >= 0 && questions.length > 0) {
            setImgSrc(questions[currentQuestionIndex].question);
        }
    }, [currentQuestionIndex, questions]);

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
                                    key={currentQuestionIndex}  // Add the key prop
                                    initial={{ y: '0.5ch', opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {currentQuestionIndex + 1}
                                </motion.p>
                            </div>
                            <img src={imgSrc} />
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            {showSolution && (
                                <motion.p
                                    key={showSolution}
                                    initial={{ x: '2ch', opacity: 0, scale: 0.99, }}
                                    animate={{ x: 0, opacity: 1, scale: 1, }}
                                    transition={{ duration: 0.25 }}
                                    className='font-semibold text-[3rem] text-purple-700'>
                                    {questions[currentQuestionIndex].solution}
                                </motion.p>
                            )
                            }
                        </div>
                    </div >
                    <div className='pt-4 flex justify-between mt-auto'>
                        <Button
                            variant="secondary"
                            onClick={goToPreviousQuestion}
                            disabled={currentQuestionIndex === 0}>
                            <ArrowLeft />
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={toggleSolution}>
                            {showSolution ? 'Hide Solution' : 'Show Solution'}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={goToNextQuestion}
                            disabled={currentQuestionIndex === questions.length - 1}
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
