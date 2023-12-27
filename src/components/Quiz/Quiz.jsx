// Quiz component
import useQuiz from '@/hooks/useQuiz';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import SplitWords from '../SplitWords';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};


const InterruptScreen = ({ title, description, callback }) => {
    return (
        <div className='flex flex-col p-9 my-auto bg-muted rounded-xl text-center mx-auto bg-gradient-to-b from-cyan-950 to-purple-950'>
            <SplitWords word={title} className='font-semibold tracking-wide text-[8rem] text-slate-50 inline-block' />
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

const Quiz = ({ game }) => {

    const pausePoints = [30]; // Define your pause points
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
                    <div className='py-9 px-16 rounded bg-gradient-light-blue bg-180 animate-gradient-animation flex flex-1 flex-col justify-center items-center'>
                        <SplitWords
                            word={questions[currentQuestionIndex].question}
                            className='font-semibold tracking-wide text-[3rem] text-indigo-950 text-center'
                        />
                        {showSolution && (
                            <div className="flex flex-col justify-center items-center">
                                <SplitWords word={questions[currentQuestionIndex].solution} className='font-semibold tracking-wide text-[3rem] text-fuchsia-800' />
                            </div>
                        )
                        }
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

export default Quiz;
