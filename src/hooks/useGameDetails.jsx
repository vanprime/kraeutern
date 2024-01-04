import { supabase } from "@/lib/supabaseClient"
import { useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * Custom hook to fetch game details from the database.
 * @param {string} gameId - The ID of the game to fetch details for.
 * @returns {Object} An object containing the game details and a loading state.
 */
export const useGameDetails = (gameId) => {

    const [gameDetails, setGameDetails] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchGameDetails = async () => {
            setLoading(true);
            if (gameId) {
                try {
                    const { data, error } = await supabase
                        .from('games')
                        .select('*')
                        .eq('id', gameId);

                    if (error) {
                        toast.error("Error fetching game details", {
                            description: error?.message,
                            position: "top-right",
                        })
                        throw error
                    };
                    setGameDetails(data);
                } catch (err) {
                    console.error('Error fetching game details:', err);
                    setError(err);
                } finally {
                    setLoading(false);
                }
            } else {
                console.log("clearing game data")
                setGameDetails({})
                setLoading(false);
            }
        };

        fetchGameDetails();
    }, [gameId]);

    return { gameDetails, loading }
}
