import React from 'react';

const Navigation = () => {
    return (
        <div className='p-4 border-b-2 border-blue-400'>
            <ul className='flex flex-row'>
                <li className='mx-2'>Game 1</li>
                <li className='mx-2'>Game 2</li>
                <li className='mx-2'>Game 3</li>
                <li className='mx-2'>Game 4</li>
            </ul>
        </div>
    );
};

export default Navigation;