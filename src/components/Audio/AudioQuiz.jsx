// AudioQuiz component
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { InterruptScreen } from './InterruptScreen';
import useQuiz from '@/hooks/useQuiz';

const AudioQuiz = ({ game }) => {

    const pausePoints = [30]; // Define your pause points
    const { questions,
        currentQuestionIndex,
        goToNextQuestion,
        goToPreviousQuestion,
        showSolution,
        setShowSolution,
        loading,
        isPaused,
        resumeAudioQuiz,
    } = useQuiz(game, pausePoints);

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

    //pause screen
    if (isPaused) {
        return (
            <InterruptScreen
                title={'Pause!'}
                description={'Kurz mal durchatmen, mit dem Button unten geht\'s weiter!'}
                callback={resumeAudioQuiz} />
        )
    }
    //loading screen
    if (loading) {
        return (
            <div className='flex flex-1 justify-center items-center'>
                <Loader2 className='animate-spin h-12 w-12' />
            </div >
        )
    }

    return (
        <>
            {questions.length > 0 && (
                <div className='flex flex-1 flex-col'>
                    <div className='py-9 px-16 grid grid-rows-2 rounded bg-gradient-light-blue bg-180 animate-gradient-animation flex-1'>
                        <div className='flex flex-1 flex-col justify-between'>
                            <div className="flex flex-row text-muted-foreground text-xl">
                                <p className='mr-[0.5ch]'>
                                    Round
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
                            <div className="flex flex-1 justify-center items-center">
                                Media file playing here
                            </div>
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

export default AudioQuiz;
