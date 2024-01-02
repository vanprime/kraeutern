import GamesList from "@/components/GamesList";
import StartHosting from "@/components/StartHosting";
import { Button } from "@/components/ui/button";
import { useGamestateContext } from "@/providers/gamestate-provider";
import { useEffect, useState } from "react";


function Host() {

    const { gameRoom } = useGamestateContext();

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-12 h-full">
            <div className="flex flex-col col-span-1 md:col-span-3 gap-4">
                <h1 className="text-3xl pb-3 w-full border-b-2">Dashboard</h1>
                <div className="grid gap-4">
                    <h2 className="text-xl">Game Stats</h2>
                    <div className="flex space-x-4">
                        <div>Game stat 1</div>
                        <div>Game stat 2</div>
                        <div>Game stat 3</div>
                        <div>Game stat 4</div>
                    </div>
                </div>
                <h2 className="text-xl">Games</h2>
                <div className="flex flex-wrap justify-between gap-6">
                    <GamesList />
                </div>
            </div>
            <div className="md:col-start-4 col-span-2 md:col-span-1">
                <StartHosting hideupperPart={true} />
            </div>
        </div>
    );
}

export default Host;