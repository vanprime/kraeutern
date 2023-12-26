import React from 'react';
import Board from './Board';
import useJeopardy from '@/hooks/useJeopardy';

const Jeopardy = ({ game }) => {

    if (!game) return (<div>no game</div>)

    const { categories, markQuestionAsAnswered } = useJeopardy(game);

    return (
        <Board categories={categories} onAnswered={markQuestionAsAnswered} />
    );
};

export default Jeopardy;