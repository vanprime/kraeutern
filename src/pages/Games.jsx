import { useGames } from '@/providers/games-provider';
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';


const Games = () => {
    const { games } = useGames()
    console.log(games)
    return (
        <div className="gap-9 p-9">
            {games.map(game => (
                <Card key={game.slug} className="flex flex-col">
                    <CardHeader>
                        <CardTitle>{game.name}</CardTitle>
                    </CardHeader>
                    {game?.thumb && <CardContent className="flex-1">
                        <img src={game.thumb} />
                    </CardContent>}
                    <CardFooter >
                        <Button asChild className="w-full">
                            <Link to={game.slug}>Play </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default Games;