import React from 'react';
import { useParams } from 'react-router-dom';

function GameDetail() {
    let { gameSlug } = useParams(); // Access the dynamic part of the URL

    return (
        <div>
            <h1>Game: {gameSlug}</h1>
        </div>
    );
}

export default GameDetail;
