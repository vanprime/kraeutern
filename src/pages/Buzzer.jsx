import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import React from 'react';
import { Link, useParams } from 'react-router-dom';


const Buzzer = () => {

    const { team_id } = useParams();

    const insertBuzzerPress = async (team_id) => {
        try {
            const { data, error } = await supabase
                .from('buzzer')
                .insert([{ team_id: team_id, timestamp: new Date().toISOString(), buzzed: true }]);

            if (error) {
                console.error('Error inserting buzzer press:', error);
                throw error;
            }
        } catch (err) {
            // Handle any errors here
            console.error('Error in insertBuzzerPress:', err);
        }
    };

    return (
        <main className='flex flex-1 p-6'>
            <div className='flex flex-1 items-center justify-center bg-slate-950 rounded-3xl flex-col p-9'>
                <Button className="bg-grad-buzzer text-[8rem] font-bold h-[5ch] w-[5ch] rounded-full" onClick={() => insertBuzzerPress(team_id)}>{team_id}</Button>
            </div>
        </main>
    );
};

export default Buzzer;