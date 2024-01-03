import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, Crown, LogOut, Trash2 } from "lucide-react";
import { useAuthContext } from "@/providers/auth-provider";
import { useGamestateContext } from "@/providers/gamestate-provider";
import GameIdQrCode from "@/components/QRCode";
import JoinGame from "./JoinGame";
import { container } from "@/lib/animationProps";
import { motion } from 'framer-motion';

function StartHosting({ hideupperPart = false }) {
    const { session, handleLogout } = useAuthContext();

    const { gameRoom, loading, handleCreateGameRoom, handleDeleteGameRoom } = useGamestateContext();

    return (
        <motion.div
            className='grid gap-4 my-4 md:my-auto w-full'
            variants={container}
            initial="hidden"
            animate="show"
        >
            {!hideupperPart && <p className="text-slate-500 ">Du bist mit <span className="text-foreground">{session?.user?.email}</span> eingeloggt.</p>}
            {!gameRoom && (
                <>
                    <p className="text-slate-500">Klicke auf den Button, um eine neue Runde zu starten.</p>
                    <Button className="w-full" disabled={loading} onClick={handleCreateGameRoom}>
                        Create Game <Crown className="ml-[1ch] h-4 w-4" />
                    </Button>
                    <div className="mt-4">
                        <JoinGame />
                    </div>
                </>
            )}
            {gameRoom?.room_id && (
                <>
                    {!hideupperPart && (
                        <div className="grid gap-4">
                            <p className="text-slate-500 ">Du hostest ein Game mit der ID: <br /> <span className="text-foreground">{gameRoom.room_id}</span></p>
                            <Button className="w-full" asChild>
                                <Link to="/host">
                                    Zum Game Dashboard <ArrowBigRight className="ml-[1ch] h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    )}
                    <GameIdQrCode />
                    <Button variant="destructive" disabled={loading} onClick={handleDeleteGameRoom}>
                        Game löschen <Trash2 className="ml-[1ch] h-4 w-4" />
                    </Button>
                </>
            )}
            <Button className="" variant="secondary" onClick={() => handleLogout()}>
                Log out <LogOut className='ml-[1ch] h-4 w-4' />
            </Button>
        </motion.div>
    );
}

export default StartHosting;