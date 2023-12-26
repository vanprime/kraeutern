import Jeopardy from '@/components/Jeopardy/Jeopardy';
import Quiz from '@/components/Quiz/Quiz';
import { useGames } from '@/providers/games-provider';
import React from 'react';
import { useParams } from 'react-router-dom';

function GameDetail() {
    let { gameSlug } = useParams(); // Access the dynamic part of the URL
    const { games } = useGames() // get games data from context

    const game = games.find(game => game.slug === gameSlug) // filter for current game

    const renderGameboard = (type) => {
        // whacky conditional render to
        switch (type) {
            case "jeopardy":
                return (<Jeopardy game={game} />)
            case "quiz":
                return (<Quiz game={game} />)
            default:
                return (<div>Game Board here</div>)
        }
    }

    return (
        <>
            {renderGameboard(game.type)}
        </>
    );
}

export default GameDetail;
