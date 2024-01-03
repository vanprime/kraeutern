import { supabase } from "@/lib/supabaseClient";
import { useGamestateContext } from "@/providers/gamestate-provider";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSupscription } from "@/hooks/useSubscription";

export const useBuzzer = () => {

    const { overshooterVisible, joinRoomId, gameRoom } = useGamestateContext();

    if (!gameRoom) return

    useSupscription();

    async function handleBuzzerPress(team_id) {
        if (overshooterVisible || !team_id) return;

        try {
            const { error } = await supabase
                .from('gamestates')
                .update({ team_id: team_id, buzzed: true })
                .eq('room_id', joinRoomId ? joinRoomId : gameRoom?.room_id)

            if (error) {
                toast.error('Error buzzing in', { description: error.message });
            }

        } catch (err) {
            console.error('Error in insertBuzzerPress:', err);
        }
    };

    async function hideBuzzer() {
        console.log('Hiding buzzer');
        try {
            const { error } = await supabase
                .from('gamestates')
                .update({ team_id: 0, buzzed: false })
                .eq('room_id', joinRoomId ? joinRoomId : gameRoom?.room_id)

            if (error) {
                console.error('Error inserting buzzer press:', error);
                toast.error('Error buzzing in', { description: error.message });
            }
        } catch (err) {
            console.error('Error in hideBuzzer:', err);
        }
    };

    // adding keydown eventListeners
    useEffect(() => {

        const handleKeyDown = (event) => {

            if (event.key === '0') {
                hideBuzzer();
            }

            if (!overshooterVisible) {
                if (event.key >= '1' && event.key <= '4') {
                    handleBuzzerPress(event.key)
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameRoom.room_id, joinRoomId]);

    return { handleBuzzerPress };
};