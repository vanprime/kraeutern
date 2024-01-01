import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/providers/auth-provider";
import { useGamestateContext } from "@/providers/gamestate-provider";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Host() {

    const session = useAuthContext();

    const [loading, setLoading] = useState(true);

    const { gameRoom, setGameRoom } = useGamestateContext()

    useEffect(() => {

        if (gameRoom?.game_room) {
            setLoading(false);
            return
        };

        const fetchGameRoom = async () => {
            setLoading(true);

            try {
                const { data, error } = await supabase
                    .from('buzzer')
                    .select('*')
                    .eq('game_room', session.user.id)

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

    async function handleCreateGameRoom() {

        try {
            const { data, error } = await supabase
                .from('buzzer')
                .insert({ game_room: session.user.id, created_by: session.user.email })
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

    return (
        <div className="p-6 grid gap-4">
            <h1 className="text-3xl">Hosting the game</h1>
            {loading && <p>Loading...</p>}
            {!loading && !gameRoom && (
                <>
                    <div>There is no game hosted by you, but you can go on and create one!</div>
                    <Button className="mr-auto" onClick={() => handleCreateGameRoom()}>Create a new gaming session</Button>
                </>
            )}
            {gameRoom &&
                <pre>
                    <p>Your Game ID is: {gameRoom.game_room}</p>
                    {JSON.stringify(gameRoom, null, 2)}
                </pre>
            }
        </div>
    );
}

export default Host;