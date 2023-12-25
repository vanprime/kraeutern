import React from 'react';
import Gamelogo from '@/assets/gamelogo.png'

const Home = () => {
    return (
        <div className='flex items-center w-full h-full bg-[#e4b7dd] rounded-3xl'>
            <img className='w-[600px] m-auto' src={Gamelogo} alt="Game logo" />
        </div>
    );
};

export default Home;