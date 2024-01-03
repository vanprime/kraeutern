// contexts/GamestateContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuthContext } from './auth-provider';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';

const GamestateContext = createContext();

export const useGamestateContext = () => useContext(GamestateContext);

export const GamestateProvider = ({ children }) => {

    const { session } = useAuthContext();

    const [gameRoom, setGameRoom] = useState({});
    const [joinRoomId, setJoinRoomId] = useState(); // joinRoomID takes precedence when existing
    const [loading, setLoading] = useState(true);
    const [overshooterVisible, setOvershooterVisible] = useState(false);
    const [activeTeamId, setActiveTeamId] = useState(null);

    async function fetchGameRoom() {
        setLoading(true);

        try {
            const { data, error } = await supabase
                .from('gamestates')
                .select('amount_buzzered, created_at, created_by, room_id, updated_at, team_id, buzzed')
                .eq('creator_id', session.user.id)

            if (error) {
                setGameRoom(null);
            };
            if (data.length === 0) {
                setGameRoom(null);
            } else {
                setGameRoom(data[0]);
                setOvershooterVisible(data[0].buzzed);
                setActiveTeamId(data[0].team_id);
            }

        } catch (err) {
            console.error('Error fetching game room:', err);
        } finally {
            setLoading(false);
        }
    };

    async function handleCreateGameRoom() {
        setLoading(true)
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
                setGameRoom(null); // Set game room to null if there's an error
            } else {
                setGameRoom(data); // Only set game room to data if there's no error
            }
        } catch (err) {
            console.error('Error fetching game room:', err);
            setGameRoom(null); // Set game room to null if there's an unexpected error
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteGameRoom() {
        console.log('Deleting game room');
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('gamestates')
                .delete('*')
                .eq('creator_id', session.user.id);

            if (error) {
                console.error('Error deleting game room:', error);
                toast.error('Error deleting game room', {
                    description: error.message,
                });
            } else {
                setGameRoom(data);
            }
        } catch (err) {
            console.error('Error deleting game room:', err);
        } finally {
            setLoading(false);
        }
    }

    async function handleManualJoinGameRoom(manualJoinRoomId) {
        console.log('Trying to joining game room: ', manualJoinRoomId);
        setLoading(true)
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
                    description: 'No game found with this ID',
                });
                throw new Error('No game found with this ID');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function fetchBuzzerState() {

        try {
            const { data, error } = await supabase
                .from('gamestates')
                .select('buzzed, team_id')
                .eq('room_id', joinRoomId ? joinRoomId : gameRoom?.room_id)
                .single();

            if (data) {
                setOvershooterVisible(data.buzzed)
                setActiveTeamId(data.buzzed)
            }

            if (error) {
                console.error('Error inserting buzzer press:', error);
                toast.error('Error getting initial Buzzer state', {
                    description: error.message
                })
                throw error;
            }
        } catch (err) {
        }
    }

    async function handleBuzzerPress(team_id) {
        console.log("overshooterVisible", overshooterVisible)
        console.log("team_id", team_id)
        if (overshooterVisible) return;

        try {
            const { data, error } = await supabase
                .from('gamestates')
                .update({ team_id: team_id, buzzed: true })
                .eq('room_id', joinRoomId ? joinRoomId : gameRoom?.room_id)

            if (error) {
                toast.error('Error buzzing in', { description: error.message });
            }

        } catch (err) {
            console.error('Error in insertBuzzerPress:', err);
        }
    };

    async function hideBuzzer() {
        console.log('Hiding buzzer');
        try {
            const { data, error } = await supabase
                .from('gamestates')
                .update({ team_id: 0, buzzed: false })
                .eq('room_id', joinRoomId ? joinRoomId : gameRoom?.room_id);

            if (error) {
                console.error('Error inserting buzzer press:', error);
                throw error;
            }
        } catch (err) {
        }
    };

    // adding supabase subscription
    useEffect(() => {

        // Realtime subscription using Supabase v2 channel
        const gameStateSubscription = supabase.channel('gamestates')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'gamestates' }, payload => {
                if (payload.new.room_id === joinRoomId || payload.new.room_id === gameRoom.room_id) {
                    setGameRoom(prevGameRoom => ({ ...prevGameRoom, ...payload.new }));
                    setActiveTeamId(payload.new.team_id);
                    setOvershooterVisible(payload.new.buzzed)
                    console.log("Update registert on game room", payload.new)
                } else {
                    setOvershooterVisible(false);
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(gameStateSubscription);
        };
    }, [gameRoom?.room_id, joinRoomId]);

    // adding eventListeners
    useEffect(() => {

        const handleKeyDown = (event) => {

            if (event.key === '0') {
                hideBuzzer();
            }

            if (!overshooterVisible) {
                if (event.key >= '1' && event.key <= '4') {
                    console.log("Buzzer pressed", "joinRoomId", joinRoomId, "gameRoom.room_id", gameRoom.room_id)
                    handleBuzzerPress(event.key, joinRoomId ? joinRoomId : gameRoom.room_id)
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameRoom?.room_id, joinRoomId]);

    useEffect(() => {

        if (!joinRoomId) return;

        fetchBuzzerState();
    },
        [joinRoomId])

    useEffect(() => {

        if (!session) {
            setLoading(false)
            return;
        }

        fetchGameRoom();
    }, [session]);

    useEffect(() => {
        if (joinRoomId && !session) {
            fetchBuzzerState();
        }
        if (session) {
            fetchGameRoom();
        }
    }, []);

    return (
        <GamestateContext.Provider value={{
            overshooterVisible,
            activeTeamId,
            hideBuzzer,
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
