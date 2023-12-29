// contexts/OvershooterContext.js
import React, { createContext, useContext } from 'react';
import { useOvershooter } from '@/hooks/useOvershooter';

const GamestateContext = createContext();

export const useGamestateContext = () => useContext(GamestateContext);

export const GamestateProvider = ({ children }) => {
    const overshooter = useOvershooter();

    return (
        <GamestateContext.Provider value={overshooter}>
            {children}
        </GamestateContext.Provider>
    );
};
