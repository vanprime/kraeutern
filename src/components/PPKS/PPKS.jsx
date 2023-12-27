// Quiz component
import useQuiz from '@/hooks/useQuiz';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { splitTextByChar } from '@/lib/textSplitters';
import SplitWords from '../SplitWords';


const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};


const InterruptScreen = ({ title, description, callback }) => {
    return (
        <div className='flex flex-col p-9 my-auto bg-muted rounded-xl text-center mx-auto min-w-96 bg-gradient-to-b from-cyan-950 to-purple-950'>
            <SplitWords word={title} className='font-semibold tracking-wider text-[5rem] text-slate-50' />
            <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
            >
                {description && <p className='text-muted-foreground'>{description}</p>}
            </motion.div>
            <div className='flex justify-center mt-9'>
                <Button onClick={callback}><Play /></Button>
            </div>
        </div>
    )
}

const Ppks = ({ game }) => {

    const pausePoints = []; // Define your pause points
    const { questions,
        currentQuestionIndex,
        goToNextQuestion,
        goToPreviousQuestion,
        showSolution,
        setShowSolution,
        loading,
        isPaused,
        resumeQuiz,
        quizStarted,
        startQuiz
    } = useQuiz(game, pausePoints);

    // Define your animation variants for each letter
    const letterVariants = {
        initial: { opacity: 0, y: 20 },
        animate: i => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05 // Delay each letter progressively
            }
        })
    };

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
    }, [goToNextQuestion, goToPreviousQuestion, toggleSolution]);

    // Starting screen
    if (!quizStarted) {
        return (
            <InterruptScreen
                title={game.name}
                description={game.description}
                callback={startQuiz} />
        );
    }

    //pause screen
    if (isPaused) {
        return (
            <InterruptScreen
                title={'Pause!'}
                description={'Kurz mal durchatmen, mit dem Button unten geht\'s weiter!'}
                callback={resumeQuiz} />
        )
    }

    return (
        <>
            {loading && <div>Loading...</div>}
            {questions.length > 0 && (
                <div className='flex flex-1 flex-col'>
                    <div className='p-9 rounded bg-background grid grid-rows-2 flex-1 justify-center bg-gradient-to-b from-slate-900 to-slate-950 '>
                        <div className='flex flex-1 justify-center items-center'>
                            <motion.div
                                key={questions[currentQuestionIndex].question}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className='text-center'
                            >
                                {splitTextByChar(questions[currentQuestionIndex].question).map(({ char, index }) => (
                                    <motion.span
                                        key={index}
                                        variants={letterVariants}
                                        custom={index}
                                        className='font-semibold tracking-wide text-[8rem] mx-2 text-indigo-950 inline-block'
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>
                        {showSolution && (
                            <div className="flex flex-col justify-center items-center">
                                <SplitWords word={questions[currentQuestionIndex].solution} className='font-semibold tracking-wide text-[3rem] text-slate-50 inline-block' />
                            </div>
                        )}
                    </div>
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
                </div>
            )}
        </ >
    );
};

export default Ppks;
