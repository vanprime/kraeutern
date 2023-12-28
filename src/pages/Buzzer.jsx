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
                .update({ team_id: team_id, buzzed: true }) // update these fields
                .eq('id', 'e87d4fdb-d2f0-4166-b1f5-99843d64302b') // where id equals this value

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
                <div className="aspect-square w-[90%] select-none">
                    <Button className="bg-grad-buzzer w-full h-full text-[4rem] font-bold rounded-full select-none"
                        onClick={() => insertBuzzerPress(team_id)}
                        onTouchStart={() => insertBuzzerPress(team_id)}
                        onTouchEnd={() => insertBuzzerPress(team_id)}
                    >{team_id}</Button>
                </div>
            </div>
        </main>
    );
};

export default Buzzer;