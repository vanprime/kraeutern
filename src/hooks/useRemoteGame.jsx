import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useSupscription } from './useSubscription';
import { useGamestateContext } from '@/providers/gamestate-provider';

const useRemoteGame = (gameId) => {

    const { gameRoom } = useGamestateContext();
    useSupscription();

    const [questions, setQuestions] = useState([]);


    async function handleUpdateCurrentGameId(gameId) {

        try {
            const { data, error } = await supabase.rpc('update_current_game_id', {
                current_game_room_id: gameRoom.room_id,
                new_game_id: gameId
            });

            console.log(data);

            if (error) {
                toast.error('Error starting game', { description: error.message });
                return false
            }

            return true

        } catch (err) {
            console.error('Error starting game:', err);
            return false
        }
    }

    async function getAllQuestions() {

        try {
            const { data, error } = await supabase
                .from('game_question_mapping')
                .select(`
                    order_number,
                    questions (
                        id,
                        question, 
                        solution,
                        solution_detail,
                        question_type
                    )
                `)
                .eq('game_id', gameId)
                .order('order_number', { ascending: true });

            if (error) {
                throw error;
            }

            // Transform data to get a clean list of questions
            const questions = data.map(item => ({
                ...item.questions,
                order: item.order_number
            }));

            setQuestions(questions);

            if (error) {
                toast.error('Error getting questions', { description: error.message });
            }

        } catch (err) {
            console.error('Error getting questions:', err);
        }
    }

    async function handleNavigateQuestion(direction) {

        const navFunction = direction === "next" ? "go_to_next_question" : "go_to_previous_question";

        console.log("navigating server side")
        try {

            const { data, error } = await supabase
                .rpc(`${navFunction}`, {
                    target_room_id: gameRoom.room_id,
                })



            if (error) {
                toast.error('Error navigating questions', { description: error.message });
            }

        } catch (err) {
            console.error('Error navigating questions:', err);
        }
    }

    useEffect(() => {
        if (!gameId) return;

        getAllQuestions();
    }, [gameId]);

    return {
        handleUpdateCurrentGameId,
        handleNavigateQuestion,
        questions,
        setQuestions
    }
};


export default useRemoteGame;