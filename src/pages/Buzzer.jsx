import Overshooter from '@/components/Overshooter';
import { Button } from '@/components/ui/button';
import { useGamestateContext } from '@/providers/gamestate-provider';
import React from 'react';
import { useParams } from 'react-router-dom';

const Buzzer = () => {

    const { team_id } = useParams();

    const { overshooterVisible, activeTeamId, handleBuzzerPress, joinRoomId } = useGamestateContext()

    return (
        <>
            <Overshooter teamId={activeTeamId} isVisible={overshooterVisible} />
            <main className='flex flex-1 p-6'>
                <div className='flex flex-1 items-center justify-center bg-slate-950 rounded-3xl flex-col p-9'>
                    <div className="aspect-square w-[90%] select-none">
                        <Button className="bg-grad-buzzer w-full h-full text-[4rem] font-bold rounded-full select-none"
                            onClick={() => handleBuzzerPress(team_id, joinRoomId)}
                            onTouchStart={() => handleBuzzerPress(team_id, joinRoomId)}
                            onTouchEnd={() => handleBuzzerPress(team_id, joinRoomId)}
                        >{team_id}
                        </Button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Buzzer;