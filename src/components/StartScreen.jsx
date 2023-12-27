// StartScreen.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartScreen = ({ game }) => {
    const navigate = useNavigate();
    const savedGame = localStorage.getItem(game.slug); // Check for saved game

    const handleNewGame = () => {
        localStorage.removeItem(game.slug); // Clear saved game data
        navigate(`/games/${game.slug}/play`);
    };

    const handleContinueGame = () => {
        navigate(`/games/${game.slug}/play`);
    };

    return (
        <div>
            <h1>Welcome to {game.name}</h1>
            <button onClick={handleNewGame}>New Game</button>
            {savedGame && <button onClick={handleContinueGame}>Continue</button>}
        </div>
    );
};

export default StartScreen;
