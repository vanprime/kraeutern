import { supabase } from "@/lib/supabaseClient";
import { useGamestateContext } from "@/providers/gamestate-provider";
import { useEffect } from "react";

export const useSupscription = () => {

    const { joinRoomId, gameRoom, setOvershooterVisible, setGameRoom, setActiveTeamId } = useGamestateContext();

    // adding supabase subscription
    useEffect(() => {

        // Realtime subscription using Supabase v2 channel
        const gameStateSubscription = supabase.channel('gamestates')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'gamestates' }, payload => {
                if (payload.new.room_id === joinRoomId || payload.new.room_id === gameRoom.room_id) {
                    setGameRoom(prevGameRoom => ({ ...prevGameRoom, ...payload.new }));
                    setActiveTeamId(payload.new.team_id);
                    setOvershooterVisible(payload.new.buzzed)
                    console.log("Update registert on game room", payload.new)
                } else {
                    setOvershooterVisible(false);
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(gameStateSubscription);
        };
    }, [gameRoom?.room_id, joinRoomId]);

    return
}
