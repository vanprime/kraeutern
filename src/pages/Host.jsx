import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/providers/auth-provider";
import { useGamestateContext } from "@/providers/gamestate-provider";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Host() {

    const session = useAuthContext();

    const { loading, handleCreateGameRoom, gameRoom } = useGamestateContext();

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
                    <p>Your Game ID is: {gameRoom.room_id}</p>
                    {JSON.stringify(gameRoom, null, 2)}
                </pre>
            }
        </div>
    );
}

export default Host;