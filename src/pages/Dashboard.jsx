import GamesList from "@/components/GamesList";
import GameStats from "@/components/Gamestats";
import StartHosting from "@/components/StartHosting";
import { useSupscription } from "@/hooks/useSubscription";
import { useGamestateContext } from "@/providers/gamestate-provider";


function Dashboard() {

    const { loading, gameRoom } = useGamestateContext();
    useSupscription();

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-12 h-full">
            <div className="flex flex-col col-span-1 md:col-span-3 gap-4">
                <h1 className="text-3xl pb-3 w-full border-b-2">Dashboard</h1>
                {!loading && gameRoom && (
                    <>
                        <div className="grid gap-4">
                            <h2 className="text-xl">Game Stats</h2>
                            <GameStats />
                        </div>
                        <h2 className="text-xl">Games</h2>
                        <div className="flex flex-wrap justify-between gap-6">
                            <GamesList gameRoom={gameRoom} />
                        </div>
                    </>
                )}
            </div>
            {(!loading && gameRoom) && (
                <div className="md:col-start-4 col-span-2 md:col-span-1">
                    <StartHosting hideupperPart={true} />
                </div>
            )}
        </div>
    );
}

export default Dashboard;