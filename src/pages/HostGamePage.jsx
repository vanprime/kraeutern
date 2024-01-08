import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { useGamestateContext } from '@/providers/gamestate-provider';
import React from 'react'
import { useParams } from 'react-router-dom';

const HostGamePage = () => {

    const { gameId } = useParams();

    const { gameRoom } = useGamestateContext();

    async function handleStartGame() {
        console.log('Starting game', gameId);

        try {
            const { error } = await supabase
                .from('gamestates')
                .update({ current_game_id: gameId })
                .eq('room_id', gameRoom.room_id)

            if (error) {
                toast.error('Error starting game', { description: error.message });
            }

        } catch (err) {
            console.error('Error starting game:', err);
        }
    }

    return (
        <div>
            Here you will host the game you choose game id: {gameId}
            <Button onClick={handleStartGame}> Start game</Button>
        </div>
    );
};

export default HostGamePage;