import React, { useEffect } from 'react';
import Gamelogo from '@/assets/gamelogo.png'
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import Footer from '@/components/Footer';

const Home = () => {

    const location = useLocation();

    useEffect(() => {

        // Function to parse the hash and extract error details
        const parseErrorFromHash = (hash) => {
            const params = new URLSearchParams(hash.substring(1)); // Remove the '#' and parse
            const error = params.get('error');
            const errorCode = params.get('error_code');
            const errorDescription = params.get('error_description');

            return { error, errorCode, errorDescription };
        };

        // Get the error details from the hash
        const { error, errorCode, errorDescription } = parseErrorFromHash(location.hash);

        // If there is an error, format and display the toast
        if (error) {
            const formattedDescription = errorDescription.replace(/\+/g, ' ');
            toast.error(`Failed to log in`, { description: formattedDescription });
        }
    }, [location.hash]);

    return (
        <>
            <main className='flex p-6 h-[100dvh]'>
                <div className='flex flex-1 items-center bg-[#e4b7dd] rounded-3xl flex-col p-9'>
                    <img className='w-[600px] m-auto' src={Gamelogo} alt="Game logo" />
                    <Button asChild className="shadow-md">
                        <Link to={'/games'}>
                            <h1 className='text-2xl font-bold uppercase tracking-[.3em]'>Start</h1>
                        </Link>
                    </Button>
                </div>
            </main>
            <Footer />
        </>

    );
};

export default Home;