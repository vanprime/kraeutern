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
    return (
        <div className="flex w-full mb-auto justify-center flex-wrap p-9">
            {games.map(game => (
                <div key={game.slug} className="basis-56 p-4">
                    <Card className="flex flex-col w-full h-full">
                        <CardHeader>
                            <CardTitle>{game.name}</CardTitle>
                            <CardDescription>{game.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="mt-auto" >
                            <Button asChild className="w-full">
                                <Link to={game.slug}>Play </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default Games;