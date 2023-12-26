import React from 'react';
import { Tile } from './Tile';
import "./jeopardy.css"

const Row = ({ children, category, color }) => {
    return (
        <div className="flex flex-col justify-between p-3 mt-auto h-full jeopardy-row">
            <div className='p-6 text-3xl font-semibold text-center text-background tracking-wide'>
                {category}
            </div>
            <div className="flex flex-col content-center">
                {children}
            </div>
        </div>
    )
}

const Board = ({ categories, onAnswered }) => {
    if (!categories) return (<div>no cat</div>)

    return (
        <div className='grid gap-0 grid-cols-5'>
            {Object.entries(categories).map(([category, content]) => (
                <Row
                    category={category}
                    key={category}
                >
                    {Object.values(content).map((questions) =>
                        Object.entries(questions).map(([value, question]) => (
                            <Tile
                                key={question.solution}
                                onAnswered={onAnswered}
                                question={question}
                                value={value}
                                category={category}
                            />
                        ))
                    )}
                </Row>
            ))}
        </div>
    );
};

export default Board;