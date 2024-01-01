import { supabase } from "@/lib/supabaseClient";
import { useGamestateContext } from "@/providers/gamestate-provider";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useGameRoom = (session) => {

    const { gameRoom, setGameRoom } = useGamestateContext()

    const [loading, setLoading] = useState(true);

    async function handleCreateGameRoom() {

        try {
            const { data, error } = await supabase
                .from('gamestates')
                .insert({
                    creator_id: session.user.id,
                    created_by: session.user.email
                })
                .select('*');

            if (error) {
                console.error('Error creating game room:', error);
                toast.error('Error creating game room', {
                    description: error.message,
                });
            };
            setGameRoom(data);
        } catch (err) {
            console.error('Error fetching game room:', err);
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteGameRoom() {
        console.log('Deleting game room');
    }

    useEffect(() => {

        const fetchGameRoom = async () => {
            setLoading(true);

            try {
                const { data, error } = await supabase
                    .from('gamestates')
                    .select('*')
                    .eq('creator_id', session.user.id)

                if (error) {
                    setGameRoom(null);
                };
                if (data.length === 0) {
                    setGameRoom(null);
                } else {
                    setGameRoom(data[0]);
                }

            } catch (err) {
                console.error('Error fetching game room:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchGameRoom();
    }, []);


    return { gameRoom, loading, handleCreateGameRoom, handleDeleteGameRoom }

}