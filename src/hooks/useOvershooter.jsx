// hooks/useOvershooter.js
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const useOvershooter = (room_id) => {
    const [overshooterVisible, setOvershooterVisible] = useState(false);
    const [teamId, setTeamId] = useState(null);

    const insertBuzzerReset = async () => {
        console.log('Inserting buzzer reset');
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

            if (event.key === '0' && overshooterVisible) {
                insertBuzzerReset();
            }

            if (!overshooterVisible) {
                if (event.key >= '1' && event.key <= '4') {
                    setTeamId(event.key);
                    setOvershooterVisible(true);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown); 1

        // Realtime subscription using Supabase v2 channel
        const buzzerSubscription = supabase.channel('buzzer')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'gamestates' }, payload => {
                if (payload.new.buzzed === true) {
                    setTeamId(payload.new.team_id);
                    setOvershooterVisible(true);
                } else {
                    setOvershooterVisible(false);
                }
            })
            .subscribe();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            supabase.removeChannel(buzzerSubscription);
        };
    }, [overshooterVisible]);

    return { overshooterVisible, setOvershooterVisible, teamId, insertBuzzerReset };
};
