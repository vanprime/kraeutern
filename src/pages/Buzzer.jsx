import React from 'react';
import { Link, useParams } from 'react-router-dom';


const Buzzer = () => {

    const { team_id } = useParams();

    return (
        <main className='flex flex-1 p-6'>
            <div className='flex flex-1 items-center justify-center bg-slate-950 rounded-3xl flex-col p-9'>
                <h1>Buzzer for {team_id}</h1>
            </div>
        </main>
    );
};

export default Buzzer;