import React from 'react';
import './Overshooter.css';
import team1 from '@/assets/1.png';
import team2 from '@/assets/2.png';
import team3 from '@/assets/3.png';
import team4 from '@/assets/4.png';

const Overshooter = ({ teamId, isVisible }) => {
    if (!isVisible) return null;

    const teamImages = [team1, team2, team3, team4];

    return (
        <div className="overshooter backdrop-blur-xl">
            <h1 className='text-primary absolute font-bold text-[7rem] drop-shadow-md1 -rotate-6'>Team {teamId}</h1>
            <img src={teamImages[teamId - 1]} alt={`Team ${teamId} buzzed!`} />
        </div>
    );
};

export default Overshooter;
