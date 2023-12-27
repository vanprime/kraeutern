// Quiz component
import useQuiz from '@/hooks/useQuiz';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import SpellingText from '../SpellingText';
import { InterruptScreen } from './InterruptScreen';

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
    }, [goToNextQuestion, goToPreviousQuestion, toggleSolution, currentQuestionIndex, isPaused]);

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
    //loading screen
    if (loading) {
        return (
            <InterruptScreen>
                <Loader2 className='animate-spin h-12 w-12' />
            </InterruptScreen >
        )
    }

    return (
        <>

            {questions.length > 0 && (
                <div className='flex flex-1 flex-col'>
                    <div className='py-9 px-16 grid grid-rows-2 rounded bg-gradient-light-blue bg-180 animate-gradient-animation flex-1 flex-col justify-center items-center overflow-y-scroll '>
                        <SpellingText
                            text={questions[currentQuestionIndex].question}
                            fontClasses='font-semibold tracking-wide text-[3rem] text-indigo-950 text-center'
                        />
                        {showSolution && (
                            <div className="flex flex-col justify-center items-center">
                                <SpellingText text={questions[currentQuestionIndex].solution} fontClasses='font-semibold tracking-wide text-[3rem] text-fuchsia-800' />
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
