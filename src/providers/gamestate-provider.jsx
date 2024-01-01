// contexts/OvershooterContext.js
import React, { createContext, useContext, useState } from 'react';
import { useOvershooter } from '@/hooks/useOvershooter';

const GamestateContext = createContext();

export const useGamestateContext = () => useContext(GamestateContext);

export const GamestateProvider = ({ children }) => {

    const [gameRoom, setGameRoom] = useState(null);

    const overshooter = useOvershooter(gameRoom?.room_id);

    return (
        <GamestateContext.Provider value={{ ...overshooter, gameRoom, setGameRoom }}>
            {children}
        </GamestateContext.Provider>
    );
};
