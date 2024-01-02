import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, Loader2, LogOut, Trash2 } from "lucide-react";
import { useAuthContext } from "@/providers/auth-provider";
import { useGamestateContext } from "@/providers/gamestate-provider";
import GameIdQrCode from "@/components/QRCode";

function StartHosting() {
    const { session, handleLogout } = useAuthContext();

    const { gameRoom, loading, handleCreateGameRoom, handleDeleteGameRoom } = useGamestateContext();

    if (loading) return (
        <div className="flex flex-1 flex-col h-full w-full justify-between">
            <Loader2 className="m-auto animate-spin" />
        </div>
    )

    return (
        <div className='grid gap-4 my-4 md:my-auto w-full'>
            <p className="text-slate-500 ">Du bist mit <span className="text-foreground">{session?.user?.email}</span> eingeloggt.</p>
            {!gameRoom && (
                <>
                    <div className="text-slate-500 ">
                        <p>Klicke auf den Button, um eine neue Runde zu starten. <br />
                            Deine Freunde können über deine Game ID an die entsprechenden buzzer kommen.</p>
                        <p>
                            Du kannst auch einem anderen Spiel beitreten, indem du unten die Game ID eingibst.
                        </p>
                    </div>
                    <Button className="w-full" disabled={loading} onClick={handleCreateGameRoom}>
                        Start hosting
                    </Button>
                </>
            )}
            {gameRoom?.room_id && (
                <>
                    <div className="grid gap-4">
                        <p className="text-slate-500 ">Du hostest ein Game mit der ID: <br /> <span className="text-foreground">{gameRoom.room_id}</span></p>
                        <Button className="w-full" asChild>
                            <Link to="/host">
                                Zum Game Dashboard <ArrowBigRight className="ml-[1ch]" />
                            </Link>
                        </Button>
                    </div>
                    <GameIdQrCode />
                    <Button variant="destructive" disabled={loading} onClick={handleDeleteGameRoom}>
                        Game löschen <Trash2 className="ml-[1ch]" />
                    </Button>
                </>
            )}
            <Button className="" variant="secondary" onClick={() => handleLogout()}>
                Log out <LogOut className='ml-[1ch]' />
            </Button>
        </div>
    );
}

export default StartHosting;