import Overshooter from '@/components/Overshooter';
import { Button } from '@/components/ui/button';
import { useBuzzer } from '@/hooks/useBuzzer';
import React from 'react';
import { useParams } from 'react-router-dom';

const Buzzer = () => {

    const { team_id } = useParams();

    if (!team_id) return null;

    const { handleBuzzerPress } = useBuzzer();

    return (
        <>
            <Overshooter />
            <div className='flex flex-1 items-center justify-center bg-slate-950 rounded-3xl flex-col p-9'>
                <div className="aspect-square w-[90%] select-none">
                    <Button className="bg-grad-buzzer w-full h-full text-[4rem] font-bold rounded-full select-none"
                        onClick={() => handleBuzzerPress(team_id)}
                        onTouchStart={() => handleBuzzerPress(team_id)}
                        onTouchEnd={() => handleBuzzerPress(team_id)}
                    >{team_id}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Buzzer;