import StartHosting from "@/components/StartHosting";
import { Button } from "@/components/ui/button";
import { useGamestateContext } from "@/providers/gamestate-provider";
import { useEffect, useState } from "react";


function Host() {

    const { handleCreateGameRoom, gameRoom } = useGamestateContext();

    return (
        <div className="p-6 grid gap-4">
            <h1 className="text-3xl">Game Dashboard</h1>
            {!gameRoom && (
                <>
                    <div>There is no game hosted by you, but you can go on and create one!</div>
                    <Button className="mr-auto" onClick={() => handleCreateGameRoom()}>Create a new gaming session</Button>
                </>
            )}
            {gameRoom &&
                <>
                    <p>Your Game ID is: {gameRoom.room_id}</p>
                    <pre>
                        {JSON.stringify(gameRoom, null, 2)}
                    </pre>
                </>
            }
        </div>
    );
}

export default Host;