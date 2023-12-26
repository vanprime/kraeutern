// Quiz component
import useQuiz from '@/hooks/useQuiz';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';

const InterruptScreen = ({ title, description, callback }) => {
    return (
        <div className='flex flex-col p-9 my-auto bg-muted rounded text-center mx-auto'>
            <div>
                <h2 className='font-semibold tracking-wider text-[5rem] text-slate-50'>{title}</h2>
                {description && <p className='text-muted-foreground'>{description}</p>}
            </div>
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

    return (
        <>
            {loading && <div>Loading...</div>}
            {questions.length > 0 && (
                isPaused ? (
                    <InterruptScreen
                        title={'Pause!'}
                        description={'Kurz mal durchatmen, mit dem Button unten geht\'s weiter!'}
                        callback={resumeQuiz} />
                ) : (
                    <div className='flex flex-1 flex-col'>
                        <div className='p-9 rounded bg-grad flex flex-1 flex-col justify-center border-slate-500 '>
                            <h2 className='font-semibold tracking-wide text-[3rem] text-indigo-950 text-center'>{questions[currentQuestionIndex].question}</h2>
                            {showSolution && (
                                <div className="p-9">
                                    <p className='font-semibold tracking-wide text-[3rem] text-fuchsia-800 text-center'>{questions[currentQuestionIndex].solution}</p>
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
                )
            )}
        </ >
    );
};

export default Quiz;
