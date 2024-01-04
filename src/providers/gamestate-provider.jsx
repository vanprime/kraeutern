// contexts/GamestateContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuthContext } from './auth-provider';
import { toast } from 'sonner';

const GamestateContext = createContext();

export const useGamestateContext = () => useContext(GamestateContext);

/**
 * Custom hook to manage game state.
 * @returns {Object} An object containing the game state and related functions.
 * @returns {boolean} overshooterVisible - Indicates whether the overshooter is visible.
 * @returns {Function} setOvershooterVisible - Function to set the visibility of the overshooter.
 * @returns {string} activeTeamId - The ID of the currently active team.
 * @returns {Function} setActiveTeamId - Function to set the active team.
 * @returns {boolean} loading - Indicates whether the game state is currently being loaded.
 * @returns {Object} gameRoom - The current game room's data.
 * @returns {Function} setGameRoom - Function to update the game room's data.
 * @returns {string} joinRoomId - The ID of the room that the player is trying to join.
 * @returns {Function} handleCreateGameRoom - Function to create a new game room.
 * @returns {Function} handleDeleteGameRoom - Function to delete the current game room.
 * @returns {Function} handleManualJoinGameRoom - Function to manually join a game room. This function takes the ID of the room to join as a parameter.
 */
const useGameState = () => {

    const { session } = useAuthContext();

    const [gameRoom, setGameRoom] = useState({});
    const [joinRoomId, setJoinRoomId] = useState(); // joinRoomID takes precedence when existing
    const [loading, setLoading] = useState(true);
    const [overshooterVisible, setOvershooterVisible] = useState(null);
    const [activeTeamId, setActiveTeamId] = useState(null);

    /**
     * Fetches the game room from the database.
     */
    async function fetchGameRoom() {
        setLoading(true);

        try {
            const { data, error } = await supabase
                .from('gamestates')
                .select('amount_buzzered, created_at, created_by, room_id, updated_at, team_id, buzzed')
                .eq('creator_id', session.user.id);

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

    /**
    * Creates a new game room in the database.
    */
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

    /**
     * Deletes the game room from the database.
     */
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

    /** 
    * Joins a game room manually.
    * @param {string} manualJoinRoomId - The ID of the game room to join.
    * @returns {boolean} Whether the game room was joined successfully.
    */
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

    /**
     * Fetches the buzzer state from the database.
     */
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

    return {
        overshooterVisible,
        setOvershooterVisible,
        activeTeamId,
        setActiveTeamId,
        loading,
        gameRoom,
        setGameRoom,
        joinRoomId,
        handleCreateGameRoom,
        handleDeleteGameRoom,
        handleManualJoinGameRoom
    }

}

export const GamestateProvider = ({ children }) => {

    const value = useGameState();

    return (
        <GamestateContext.Provider value={value}>
            {children}
        </GamestateContext.Provider>
    );
};
