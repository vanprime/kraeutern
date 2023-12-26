import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

// Initialize Supabase client
const GamesContext = createContext(null);

export const GamesProvider = ({ children }) => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('games')
                    .select('*');

                if (error) {
                    toast.error("Error fetching games", {
                        description: error?.message,
                        position: "top-right",
                    })
                    throw error
                };
                setGames(data);
            } catch (err) {
                console.error('Error fetching games:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    return (
        <GamesContext.Provider value={{ games, loading, error }}>
            {children}
        </GamesContext.Provider>
    );
};

export const useGames = () => useContext(GamesContext);