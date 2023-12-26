// Quiz component
import useQuiz from '@/hooks/useQuiz';
import { useEffect } from 'react';

const Quiz = ({ game }) => {

    const pausePoints = [30]; // Define your pause points
    const { questions, currentQuestionIndex, goToNextQuestion, goToPreviousQuestion, showSolution, setShowSolution, loading, isPaused, resumeQuiz } = useQuiz(game, pausePoints);

    const toggleSolution = () => setShowSolution(!showSolution);

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

    return (
        <div>
            {loading && <div>Loading...</div>}
            {questions.length > 0 && (
                isPaused ? (
                    <div>
                        <h2>Quiz Paused</h2>
                        <p>Take a break! When you're ready, click below to continue.</p>
                        <button onClick={resumeQuiz}>Resume Quiz</button>
                    </div>
                ) : (
                    <div>
                        <div>
                            <h2>{questions[currentQuestionIndex].question}</h2>
                            {showSolution && <p>{questions[currentQuestionIndex].solution}</p>}
                        </div>
                        <div>
                            <button onClick={toggleSolution}>
                                {showSolution ? 'Hide Solution' : 'Show Solution'}
                            </button>
                            <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
                                Previous
                            </button>
                            <button
                                onClick={goToNextQuestion}
                                disabled={currentQuestionIndex === questions.length - 1}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )
            )}
        </div >
    );
};

export default Quiz;
