import React from 'react';
import useJeopardy from '@/hooks/useJeopardy';
import Row from './components/Row';
import { Tile } from './components/Tile';
import "./jeopardy.css"
import Overshooter from '@/components/Overshooter';
import { useGamestateContext } from '@/providers/gamestate-provider';

const Jeopardy = ({ game }) => {

    const { overshooterVisible, activeTeamId } = useGamestateContext();
    const { categories, markQuestionAsAnswered } = useJeopardy(game);

    //TODO Make cols dynamic
    return (
        <>
            <Overshooter />
            <div className={`grid gap-0 grid-cols-5`}>
                {Object.entries(categories).map(([category, content]) => (
                    <Row
                        category={category}
                        key={category}
                    >
                        {Object.values(content).map((questions) =>
                            Object.entries(questions).map(([value, question]) => (
                                <Tile
                                    key={question.solution}
                                    onAnswered={markQuestionAsAnswered}
                                    question={question}
                                    value={value}
                                    category={category}
                                />
                            ))
                        )}
                    </Row>
                ))}
            </div>
        </>
    );
};

export default Jeopardy;