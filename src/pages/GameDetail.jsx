// GameDetail.jsx
import React from 'react';
import { useParams, useRoutes } from 'react-router-dom';
import { useGames } from '@/providers/games-provider';
import StartScreen from '@/components/StartScreen';
import Jeopardy from '@/components/Jeopardy/Jeopardy';
import Quiz from '@/components/Quiz/Quiz';

function GameDetail() {

    let { gameSlug } = useParams();
    const { games } = useGames();
    const game = games.find(game => game.slug === gameSlug);

    if (!game) return (<div>That game doesn't exist ... yet?</div>);

    const gameRoutes = useRoutes([
        { path: "/", element: <StartScreen game={game} /> },
        { path: "play", element: <GameBoard game={game} /> },
    ]);

    return gameRoutes;
}

const GameBoard = ({ game }) => {

    if (game?.type === 'jeopardy') {
        return <Jeopardy game={game} />;
    }

    return <Quiz game={game} />;
};

export default GameDetail;
