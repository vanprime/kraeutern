import React from 'react';
import Jeopardy from '@/components/Jeopardy/Jeopardy';
import Quiz from '@/components/Quiz/Quiz';
import { useGames } from '@/providers/games-provider';
import { useParams } from 'react-router-dom';

export const GameBoard = () => {

    const { games } = useGames();
    const { gameSlug } = useParams();
    const game = games.find(game => game.slug === gameSlug);

    console.log("gameboard rendered");

    if (game?.type === 'jeopardy') {
        return <Jeopardy game={game} />;
    }

    return <Quiz game={game} />;
};
export default GameBoard;
