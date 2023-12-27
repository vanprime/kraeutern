// useQuiz.js
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const useQuiz = (game, pausePoints = []) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showSolution, setShowSolution] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [quizStarted, setQuizStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const saveGameState = () => {
        const gameState = {
            questions,
            currentQuestionIndex,
            showSolution,
            quizStarted,
            isPaused
        };
        localStorage.setItem(game.slug, JSON.stringify(gameState));
    };

    const loadGameState = () => {
        let gameState = localStorage.getItem(game.slug);
        if (gameState) {
            gameState = JSON.parse(gameState);
            toast("restored game data from local storage", {
                description: `continue playing at round ${gameState.currentQuestionIndex + 1}`,
                position: "bottom-right",
            });
            setQuestions(gameState.questions);
            setCurrentQuestionIndex(gameState.currentQuestionIndex);
            setShowSolution(false); //to prevent showing solution when restoring game
            setQuizStarted(gameState.quizStarted);
            setIsPaused(gameState.isPaused);
            updateHash(gameState.currentQuestionIndex);
            setLoading(false);
        } else {
            fetchGameData();
        }
    };

    // Function to reset state
    const resetState = () => {
        setShowSolution(false);
        setQuizStarted(false);
        setIsPaused(false);
        setCurrentQuestionIndex(0);
    };

    const updateHash = (index) => {
        if (index >= 0 && index < questions.length) {
            navigate(`#q${questions[index].order}`, { replace: true });
        }
    };

    const goToNextQuestion = () => {
        setShowSolution(false);
        if (currentQuestionIndex < questions.length - 1 && !isPaused && quizStarted) {
            const newIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(newIndex);
            updateHash(newIndex);

            if (pausePoints.includes(newIndex + 1)) { // Check if next question is a pause point
                setIsPaused(true); // Pause the quiz
            }
        };
    };

    const goToPreviousQuestion = () => {
        setShowSolution(false);
        if (currentQuestionIndex > 0 && !isPaused && quizStarted) {
            const newIndex = currentQuestionIndex - 1;
            setCurrentQuestionIndex(newIndex);
            updateHash(newIndex);
        }
    };

    const startQuiz = () => {
        setQuizStarted(true);
    };

    const resumeQuiz = () => {
        setIsPaused(false);
    };

    const fetchGameData = async () => {
        setLoading(true);
        resetState();
        try {
            const { data, error } = await supabase
                .from(game.slug)
                .select('question, solution, order')
                .order('order', { ascending: true });

            if (error) {
                throw error;
            }

            setQuestions(data);
            setCurrentQuestionIndex(0); // Reset to the first question
            updateHash(0); // Update hash to the first question
        } catch (err) {
            console.error('Error fetching game content:', err);
            setError(err);
            toast.error("Error fetching game content", {
                description: err?.message,
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        resetState(); // Reset state whenever the game changes
        loadGameState();
    }, [game.slug]);

    useEffect(() => {
        const index = questions.findIndex(q => `q${q.order}` === location.hash.replace('#', ''));
        if (index >= 0) {
            setCurrentQuestionIndex(index);
        }
    }, [location.hash, questions, currentQuestionIndex]);

    useEffect(() => {
        if (questions && currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
            saveGameState();
        }
    }, [questions, currentQuestionIndex, showSolution, quizStarted, isPaused]);

    return {
        questions,
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
    };
};

export default useQuiz;
