import GameStats from '@/components/Gamestats';
import { Button } from '@/components/ui/button';
import useRemoteGame from '@/hooks/useRemoteGame';
import { useSupscription } from '@/hooks/useSubscription';
import { supabase } from '@/lib/supabaseClient';
import { cn } from '@/lib/utils';
import { useGamestateContext } from '@/providers/gamestate-provider';
import React from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const HostGamePage = () => {

    const { gameId } = useParams();
    const { gameRoom } = useGamestateContext();

    const { questions, handleNavigateQuestion } = useRemoteGame(gameId);

    return (
        <div>
            <GameStats />
            <div className='flex flex-col gap-4 my-4'>
                {questions.length >= 1 && questions.map((question, index) => (
                    <div
                        key={index}
                        className={`
                    flex p-2 rounded-md
                    ${gameRoom.current_question_id === question.id ? 'outline' : ''}`}>
                        <div className='pr-2'>
                            <p className=''>{index + 1}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium'>{question.question}</p>
                            <p className='text-muted-foreground'>{question.solution}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Button onClick={() => handleNavigateQuestion("previous")}>Previous question</Button>
            <Button onClick={() => handleNavigateQuestion("next")}>Next question</Button>
        </div>
    );
};

export default HostGamePage;