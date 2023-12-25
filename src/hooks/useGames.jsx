import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from "sonner"

const useGames = () => {
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

    return { games, loading, error };
};

export default useGames