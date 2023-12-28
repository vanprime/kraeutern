import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

const Teamselect = () => {
    return (
        <main className='flex flex-1 p-6'>
            <div className='flex flex-1 items-center bg-slate-900 rounded-3xl flex-col p-9'>
                <h1 className='text-2xl font-semibold'>Select your Team</h1>
                <div className="flex flex-col flex-1 p-9 justify-around">
                    <Button asChild className="m-9 flex p-9">
                        <Link className='text-xl font-semibold' to={'/buzzern/1'}>1</Link>
                    </Button>
                    <Button asChild className="m-9 flex p-9">
                        <Link className='text-xl font-semibold' to={'/buzzern/2'}>2</Link>
                    </Button>
                    <Button asChild className="m-9 flex p-9">
                        <Link className='text-xl font-semibold' to={'/buzzern/3'}>3</Link>
                    </Button>
                    <Button asChild className="m-9 flex p-9">
                        <Link className='text-xl font-semibold' to={'/buzzern/4'}>4</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default Teamselect;