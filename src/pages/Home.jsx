import React from 'react';
import Gamelogo from '@/assets/gamelogo.png'
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <main className='flex flex-1 p-6'>
            <div className='flex flex-1 items-center bg-[#e4b7dd] rounded-3xl flex-col p-9'>
                <img className='w-[600px] m-auto' src={Gamelogo} alt="Game logo" />
                <Button asChild className="shadow-md">
                    <Link to={'/games'}>
                        <h1 className='text-2xl font-bold uppercase tracking-[.3em]'>Start</h1>
                    </Link>
                </Button>
            </div>
        </main>
    );
};

export default Home;