// useQuiz.js
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const useQuiz = (game, pausePoints = []) => {

    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [gameState, setGameState] = useState({
        currentQuestionIndex: 0,
        showSolution: false,
        isPaused: false,
    });


    const saveGame = () => {
        localStorage.setItem(game.slug, JSON.stringify({ questions, gameState }));
    };

    // try to load game from local storage
    const loadGame = () => {
        let savegame = localStorage.getItem(game.slug);

        if (savegame) {
            try {
                savegame = JSON.parse(savegame);
                if (savegame.questions.length > 0 && savegame.gameState) {
                    return true
                } else {
                    return false
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        } else {
            return false
        }
    };

    //ensuring that the game is loaded from local storage if possible
    const handleLoadGame = () => {
        const success = loadGame();

        if (success) {
            const savegame = JSON.parse(localStorage.getItem(game.slug));
            setQuestions(savegame.questions);
            setGameState(savegame.gameState);
            updateHash(savegame.gameState.currentQuestionIndex);
            toast('Savegame found', { description: `continuing at question ${savegame.gameState.currentQuestionIndex + 1}` })
        } else {
            fetchGameData();
        }
    }

    // Function to reset state
    const resetState = () => {
        setQuestions([]);
        setGameState({
            currentQuestionIndex: 0,
            showSolution: false,
            isPaused: false,
        });
    };

    const updateHash = (index) => {
        if (index >= 1 && index < questions.length) {
            navigate(`#q${questions[index].order}`, { replace: true });
        }
    };

    const goToNextQuestion = () => {
        if (gameState.currentQuestionIndex < questions.length - 1 && !gameState.isPaused) {
            const newIndex = gameState.currentQuestionIndex + 1;
            setGameState(prevState => ({
                ...prevState,
                currentQuestionIndex: prevState.currentQuestionIndex + 1,
                showSolution: false
            }));
            updateHash(newIndex);
            if (pausePoints.includes(newIndex + 1)) { // Check if next question is a pause point
                pauseQuiz();
            }
        };
    };

    const goToPreviousQuestion = () => {
        if (gameState.currentQuestionIndex > 0 && !gameState.isPaused) {
            const newIndex = gameState.currentQuestionIndex - 1;
            setGameState(prevState => ({
                ...prevState,
                currentQuestionIndex: newIndex,
                showSolution: false
            }));
            updateHash(newIndex);
        }
    };

    const toggleSolution = () => {
        if (!gameState.isPaused) {
            setGameState(prevState => ({
                ...prevState,
                showSolution: !prevState.showSolution
            }));
        }
    };

    const pauseQuiz = () => {
        setGameState(prevstate => ({
            ...prevstate,
            isPaused: true,
            showSolution: false
        }))
    };

    const resumeQuiz = () => {
        setGameState(prevstate => ({
            ...prevstate,
            isPaused: false
        }))
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
            updateHash(1); // Update hash to the first question
        } catch (err) {
            console.error('Error fetching game content:', err);
            toast.error("Error fetching game content", {
                description: err?.message,
            });
        } finally {
            setLoading(false);
        }
    };

    //loading game on game slug change
    useEffect(() => {
        handleLoadGame();
    }, [game.slug]);

    // auto saving to local storage
    useEffect(() => {
        if (questions && gameState.currentQuestionIndex >= 2 && gameState.currentQuestionIndex < questions.length) {
            saveGame();
        }
    }, [questions, gameState]);

    //adding key listeners
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
    }, [gameState, questions, goToNextQuestion, goToPreviousQuestion, toggleSolution]);

    return {
        questions,
        gameState,
        setGameState,
        goToNextQuestion,
        goToPreviousQuestion,
        loading,
        resumeQuiz,
        toggleSolution,
    };
};

export default useQuiz;
