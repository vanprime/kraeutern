import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import JoinGame from "@/components/JoinGame";
import { LogOut } from "lucide-react";
import { useAuthContext } from "@/providers/auth-provider";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

function StartHosting() {
    const session = useAuthContext();

    async function handleLogout() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.log(error)
            toast.error(`Failed to log out`, { description: error.message });
        }
    }

    return (
        <div className='flex flex-1 flex-col h-full justify-between'>
            <div className="grid gap-4 sm:my-4">
                <h1 className='text-2xl border-b-2'>Hey!</h1>
                <div className='text-slate-500'>
                    <p>Du bist mit {session?.user?.email} eingeloggt.</p>
                    <p>Klicke auf den Button, um eine neue Runde zu starten. <br />
                        Deine Freunde können über deine Game ID an die entsprechenden buzzer kommen.</p>
                    <p>
                        Du kannst auch einem anderen Spiel beitreten, indem du unten die Game ID eingibst.
                    </p>
                </div>
                <Button className="w-full" asChild>
                    <Link to="/host">
                        Start hosting
                    </Link>
                </Button>
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