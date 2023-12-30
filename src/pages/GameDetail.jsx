// GameDetail.jsx
import React from 'react';
import { useParams, useRoutes } from 'react-router-dom';
import { useGames } from '@/providers/games-provider';
import StartScreen from '@/components/StartScreen';
import Jeopardy from '@/components/Jeopardy/Jeopardy';
import Quiz from '@/components/Quiz/Quiz';
import AudioQuiz from '@/components/Audio/AudioQuiz';
import Slideshow from '@/components/Slideshow/Slideshow';

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

    switch (game?.type) {
        case "jeopardy":
            return <Jeopardy game={game} />;
        case "quiz":
            return <Quiz game={game} />;
        case "audio":
            return <AudioQuiz game={game} />;
        case "slideshow":
            return <Slideshow game={game} />;
        default:
            return <div>Game Board here</div>;
    }
};

export default GameDetail;
