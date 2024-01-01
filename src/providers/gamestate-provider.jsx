// contexts/OvershooterContext.js
import React, { createContext, useContext, useState } from 'react';
import { useOvershooter } from '@/hooks/useOvershooter';

const GamestateContext = createContext();

export const useGamestateContext = () => useContext(GamestateContext);

export const GamestateProvider = ({ children }) => {
    const overshooter = useOvershooter();

    const [gameId, setGameId] = useState(null);

    return (
        <GamestateContext.Provider value={{ ...overshooter, gameId, setGameId }}>
            {children}
        </GamestateContext.Provider>
    );
};
