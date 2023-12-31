import { useEffect, useState } from 'react';
import Gamelogo from '@/assets/gamelogo.png'
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import Footer from '@/components/Footer';
import Signup from '@/components/Signup';
import { useAuthContext } from '@/providers/auth-provider';
import { supabase } from '@/lib/supabaseClient';

const Home = () => {

    const location = useLocation();
    const session = useAuthContext();

    const [pageError, setPageError] = useState(null);

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

    async function handleLogout() {
        const { error } = await supabase.auth.signOut()
    }

    return (
        <>
            <main className="flex p-6 min-h-[100dvh]">
                <div className="flex-1 grid sm:grid-cols-1 md:grid-cols-3 md:gap-9 sm:gap-3">
                    <div className='md:col-span-2 flex flex-1 items-center bg-[#e4b7dd] rounded-3xl'>
                        <img className='w-[600px] m-auto' src={Gamelogo} alt="Game logo" />
                    </div >
                    <div className="flex flex-1 justify-center items-center">
                        <div className="p-6 rounded w-full">
                            {session ? (
                                <Button onClick={() => handleLogout()}>
                                    Log out
                                </Button>
                            ) :
                                <Signup />}
                        </div>
                    </div>
                </div>
            </main >
            <Footer />
        </>

    );
};

export default Home;