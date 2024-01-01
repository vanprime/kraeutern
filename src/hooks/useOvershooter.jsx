// hooks/useOvershooter.js
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const useOvershooter = (room_id) => {
    const [overshooterVisible, setOvershooterVisible] = useState(false);
    const [activeTeamId, setActiveTeamId] = useState(null);

    const hideBuzzer = async () => {
        console.log('Hiding buzzer');
        try {
            const { data, error } = await supabase
                .from('gamestates')
                .update({ team_id: 0, buzzed: false })
                .eq('room_id', room_id);

            if (error) {
                console.error('Error inserting buzzer press:', error);
                throw error;
            }
        } catch (err) {
            console.error('Error in insertBuzzerPress:', err);
        }
    };

    useEffect(() => {

        const handleKeyDown = (event) => {

            if (event.key === '0') {
                hideBuzzer();
            }

            if (!overshooterVisible) {
                if (event.key >= '1' && event.key <= '4') {
                    setActiveTeamId(event.key);
                    setOvershooterVisible(true);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown); 1

        // Realtime subscription using Supabase v2 channel
        const buzzerSubscription = supabase.channel('buzzer')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'gamestates' }, payload => {
                if (payload.new.buzzed === true && payload.new.room_id === room_id) {
                    setActiveTeamId(payload.new.team_id);
                    setOvershooterVisible(true);
                    console.log("Buzzer registered with new team_id:", payload.new.team_id)
                } else {
                    setOvershooterVisible(false);
                }
            })
            .subscribe();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            supabase.removeChannel(buzzerSubscription);
        };
    }, [overshooterVisible, room_id]);

    useEffect(() => {

        if (!room_id) return;

        //initialize buzzer state
        async function getInitialBuzzerState() {

            try {
                const { data, error } = await supabase
                    .from('gamestates')
                    .select('buzzed')
                    .eq('room_id', room_id)
                    .single();

                if (data) {
                    setOvershooterVisible(data.buzzed)
                }

                if (error) {
                    console.error('Error inserting buzzer press:', error);
                    throw error;
                }
            } catch (err) {
                console.error('Cant get initial buzzer state:', err);
            }
        }

        getInitialBuzzerState();
    },
        [room_id])

    // to implement a timeout for the overshooter, uncomment this:
    /*     useEffect(() => {
            if (overshooterVisible) {
                const timer = setTimeout(() => {
                    hideBuzzer();
                }, 1500);
                return () => clearTimeout(timer);
            }
        }, [overshooterVisible]); */

    return { overshooterVisible, setOvershooterVisible, activeTeamId, hideBuzzer };
};
