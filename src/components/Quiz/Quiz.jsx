// Quiz component
import useQuiz from '@/hooks/useQuiz';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { InterruptScreen } from '@/components/InterruptScreen';
import Overshooter from '@/components/Overshooter';

const Quiz = ({ game }) => {

    const pausePoints = [26]; // Define your pause points
    const {
        questions,
        gameState,
        goToNextQuestion,
        goToPreviousQuestion,
        loading,
        resumeQuiz,
        toggleSolution,
    } = useQuiz(game, pausePoints);

    //pause screen
    if (gameState?.isPaused) {
        return (
            <InterruptScreen
                title={'Pause!'}
                description={'Kurz mal durchatmen, mit dem Button unten geht\'s weiter!'}
                callback={resumeQuiz} />
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
            <Overshooter />
            {questions?.length > 0 && (
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
                            <div className="flex flex-1 justify-center items-center">
                                <motion.p
                                    key={questions[gameState.currentQuestionIndex].question}
                                    initial={{ x: '-1ch', opacity: 0, scale: 0.99, }}
                                    animate={{ x: 0, opacity: 1, scale: 1, }}
                                    transition={{ duration: 0.25 }}
                                    className='font-semibold tracking-wide text-[3.8vw] leading-tight text-indigo-950 text-center'>
                                    {questions[gameState.currentQuestionIndex].question}
                                </motion.p>
                            </div>
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

export default Quiz;
