import { useEffect, useState } from 'react';
import Gamelogo from '@/assets/gamelogo.png'
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import Footer from '@/components/Footer';
import Signup from '@/components/Signup';
import { useAuthContext } from '@/providers/auth-provider';
import { supabase } from '@/lib/supabaseClient';
import JoinGame from '@/components/JoinGame';
import { LogOut } from 'lucide-react';
import StartHosting from '@/components/StartHosting';

const Home = () => {

    const location = useLocation();
    const session = useAuthContext();

    const [pageError, setPageError] = useState(null);
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (pageError) setPageError(null);

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
            setPageError(`Failed to log in ${formattedDescription}`)
            toast.error(`Failed to log in`, { description: formattedDescription });
        }
    }, [location.hash]);

    return (
        <>
            <main className="flex p-6 min-h-[100dvh]">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 ">
                    <div className='md:col-span-2 flex flex-1 items-center bg-[#e4b7dd] rounded-3xl'>
                        <img className='w-[600px] m-auto' src={Gamelogo} alt="Game logo" />
                    </div >
                    <div className="p-4 rounded-xl flex flex-col flex-1 border-2">
                        <div className="flex flex-col flex-1 justify-center items-center max-w-full md:max-w-96 md:mx-auto">
                            {session && (
                                <StartHosting />
                            )}
                            <div className='grid gap-16 w-full'>
                                {!session && (
                                    <div className='flex-1 w-full'>
                                        <Signup submitted={submitted} setSubmitted={setSubmitted} />
                                    </div>
                                )}
                                {!submitted || session && (
                                    <div className='flex-1 w-full'>
                                        <JoinGame />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main >
            <Footer />
        </>

    );
};

export default Home;