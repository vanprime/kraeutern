import React from 'react';
import { Tile } from './Tile';

const Row = ({ children, category, color }) => {
    return (
        <div className={`flex flex-col justify-between p-3 bg-${color}-950 mt-auto h-full`}>
            <div className='p-6 text-3xl font-semibold text-center'>{category}</div>
            <div className="flex flex-col content-center">
                {children}
            </div>
        </div>
    )
}

const Board = ({ categories, onAnswered }) => {
    if (!categories) return (<div>no cat</div>)
    const colors = ['fuchsia', 'sky', 'teal', 'violet', 'yellow',]; // Add more colors if needed

    return (
        <div className='grid gap-0 grid-cols-5'>
            {Object.entries(categories).map(([category, content], index) => (
                <Row
                    category={category}
                    key={category}
                    color={colors[index % colors.length]}
                >
                    {Object.values(content).map((questions) =>
                        Object.entries(questions).map(([value, question]) => (
                            <Tile
                                key={question.solution}
                                onAnswered={onAnswered}
                                question={question}
                                value={value}
                                color={colors[index % colors.length]}
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