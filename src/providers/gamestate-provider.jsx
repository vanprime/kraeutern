// contexts/OvershooterContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useOvershooter } from '@/hooks/useOvershooter';
import { supabase } from '@/lib/supabaseClient';
import { useAuthContext } from './auth-provider';
import { toast } from 'sonner';

const GamestateContext = createContext();

export const useGamestateContext = () => useContext(GamestateContext);

export const GamestateProvider = ({ children }) => {

    const { session } = useAuthContext();

    const [gameRoom, setGameRoom] = useState(null);
    const [joinRoomId, setJoinRoomId] = useState(null); //TODO to join games even when logged in
    const [loading, setLoading] = useState(true);

    // joinRoomId is used for manual join and takes precedence over gameRoom
    const overshooter = useOvershooter(joinRoomId ? joinRoomId : gameRoom?.room_id);

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

    async function handleManualJoinGameRoom(manualJoinRoomId) {
        console.log('Trying to joining game room');

        try {
            const { data, error } = await supabase
                .from('gamestates')
                .select('*')
                .eq('room_id', manualJoinRoomId);

            if (error) {
                console.error('Error joining game room:', error);
                toast.error('Error joining game room', {
                    description: error.details,
                });
                throw new Error('Error joining game room');
            };

            if (data && data.length > 0) {
                setJoinRoomId(data[0].room_id);
                return true;
            }
            if (data && data.length === 0) {
                toast.error('Error joining game room', {
                    description: 'No game found with this ID.',
                });
                throw new Error('No game found with this ID');
            }
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function handleBuzzerPress(team_id, manualJoinRoomId) {

        if (overshooter.overshooterVisible) return;

        try {
            const { data, error } = await supabase
                .from('gamestates')
                .update({ team_id: team_id, buzzed: true })
                .eq('room_id', manualJoinRoomId ? manualJoinRoomId : gameRoom?.room_id)

            if (error) {
                toast.error('Error buzzing in', { description: error.message });
            }

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
        <GamestateContext.Provider value={{
            ...overshooter,
            loading,
            gameRoom,
            setGameRoom,
            joinRoomId,
            handleCreateGameRoom,
            handleDeleteGameRoom,
            handleBuzzerPress,
            handleManualJoinGameRoom
        }}>
            {children}
        </GamestateContext.Provider>
    );
};
