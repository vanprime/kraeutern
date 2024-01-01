import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import JoinGame from "@/components/JoinGame";
import { LogOut } from "lucide-react";
import { useAuthContext } from "@/providers/auth-provider";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { useGamestateContext } from "@/providers/gamestate-provider";
import { useEffect, useState } from "react";

function StartHosting() {
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


    async function handleLogout() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.log(error)
            toast.error(`Failed to log out`, { description: error.message });
        }
    }

    return (
        <div className='flex flex-1 flex-col h-full w-full justify-between'>
            <div className="grid gap-4 sm:my-4">
                <h1 className='text-2xl border-b-2'>Hey!</h1>
                <div className='text-slate-500 grid gap-4'>
                    <p>Du bist mit {session?.user?.email} eingeloggt.</p>
                    {!gameRoom && (
                        <>
                            <div className="">
                                <p>Klicke auf den Button, um eine neue Runde zu starten. <br />
                                    Deine Freunde können über deine Game ID an die entsprechenden buzzer kommen.</p>
                                <p>
                                    Du kannst auch einem anderen Spiel beitreten, indem du unten die Game ID eingibst.
                                </p>
                            </div>
                            <div className="mt-2">
                                <Button className="w-full" onClick={() => handleCreateGameRoom()}>
                                    Start hosting
                                </Button>
                            </div>
                        </>
                    )}
                    {gameRoom?.game_room && (
                        <div className="grid gap-4">
                            <p>Deine Game ID ist: <br /> <span className="text-foreground">{gameRoom.game_room}</span></p>
                        </div>
                    )}
                </div>
            </div>
            <div className="my-4 md:my-0">
                <JoinGame />
            </div>
            <Button className="mt-4 md:mt-0" variant="secondary" onClick={() => handleLogout()}>
                <LogOut className='mr-[1ch]' />End session
            </Button>
        </div>
    );
}

export default StartHosting;