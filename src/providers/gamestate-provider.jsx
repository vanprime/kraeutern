// contexts/OvershooterContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useOvershooter } from '@/hooks/useOvershooter';
import { supabase } from '@/lib/supabaseClient';
import { useAuthContext } from './auth-provider';

const GamestateContext = createContext();

export const useGamestateContext = () => useContext(GamestateContext);

export const GamestateProvider = ({ children }) => {

    const session = useAuthContext();

    const [gameRoom, setGameRoom] = useState(null);
    const [joinRoomId, setJoinRoomId] = useState(null); //TODO to join games even when logged in
    const [loading, setLoading] = useState(true);

    const overshooter = useOvershooter(gameRoom?.room_id);

    async function handleCreateGameRoom() {

        try {
            const { data, error } = await supabase
                .from('gamestates')
                .insert({
                    creator_id: session.user.id,
                    created_by: session.user.email
                })
                .select('*')
                .single();

            if (error) {
                console.error('Error creating game room:', error);
                toast.error('Error creating game room', {
                    description: error.message,
                });
            };
            setGameRoom(data);
        } catch (err) {
            console.error('Error fetching game room:', err);
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteGameRoom() {
        console.log('Deleting game room');

        try {
            const { data, error } = await supabase
                .from('gamestates')
                .delete('*')
                .eq('creator_id', session.user.id);

            if (error) {
                console.error('Error creating game room:', error);
                toast.error('Error creating game room', {
                    description: error.message,
                });
            };
            setGameRoom(data);
        } catch (err) {
            console.error('Error fetching game room:', err);
        } finally {
            setLoading(false);
        }

    }

    async function handleBuzzerPress(team_id) {

        if (overshooter.overshooterVisible) return;

        try {
            const { data, error } = await supabase
                .from('gamestates')
                .update({ team_id: team_id, buzzed: true })
                .eq('room_id', gameRoom?.room_id)

        } catch (err) {
            console.error('Error in insertBuzzerPress:', err);
        }
    };

    useEffect(() => {

        if (!session) return;

        async function fetchGameRoom() {

            setLoading(true);

            try {
                const { data, error } = await supabase
                    .from('gamestates')
                    .select('*')
                    .eq('creator_id', session.user.id)

                if (error) {
                    setGameRoom(null);
                };
                if (data.length === 0) {
                    setGameRoom(null);
                } else {
                    setGameRoom(data[0]);
                }

            } catch (err) {
                console.error('Error fetching game room:', err);
            } finally {
                setLoading(false);
            }
        };


        fetchGameRoom();
    }, [session]);


    return (
        <GamestateContext.Provider value={{ ...overshooter, loading, gameRoom, setGameRoom, handleCreateGameRoom, handleDeleteGameRoom, handleBuzzerPress }}>
            {children}
        </GamestateContext.Provider>
    );
};
