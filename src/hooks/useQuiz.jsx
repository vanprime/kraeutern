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

    const updateHash = (index) => {
        if (index >= 0 && index < questions.length) {
            navigate(`#q${questions[index].order}`, { replace: true });
        }
    };

    const goToNextQuestion = () => {
        setShowSolution(false);
        if (currentQuestionIndex < questions.length - 1 && !isPaused) {
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
        if (currentQuestionIndex > 0 && !isPaused) {
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

    useEffect(() => {
        const fetchGameDetails = async () => {
            if (game.slug) {
                try {
                    const { data, error } = await supabase
                        .from(game.slug)
                        .select('question, solution, order')
                        .order('order', { ascending: true })

                    if (error) {
                        toast.error("Error fetching game content", {
                            description: error?.message,
                            position: "top-right",
                        })
                        throw error
                    };
                    setQuestions(data);
                } catch (err) {
                    console.error('Error fetching game content:', err);
                    setError(err);
                } finally {
                    setLoading(false);
                }
            } else {
                console.log("clearing questions")
                setQuestions([])
                setLoading(false);
            }
        };

        fetchGameDetails();
    }, [game]);

    useEffect(() => {
        const index = questions.findIndex(q => `q${q.order}` === location.hash.replace('#', ''));
        if (index >= 0) {
            setCurrentQuestionIndex(index);
        }
    }, [location.hash, questions]);

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
