import React from 'react';
import { useParams, useOutlet } from 'react-router-dom';
import { useGames } from '@/providers/games-provider';

function GameDetail() {
    let { gameSlug } = useParams();
    const { games } = useGames();
    const game = games.find(game => game.slug === gameSlug);

    if (!game) return (<div>That game doesn't exist ... yet?</div>);

    const outlet = useOutlet();

    return React.cloneElement(outlet, { game });
}

export default GameDetail;