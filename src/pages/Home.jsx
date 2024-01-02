import { useState } from 'react';
import Gamelogo from '@/assets/gamelogo.png'
import Footer from '@/components/Footer';
import Signup from '@/components/Signup';
import { useAuthContext } from '@/providers/auth-provider';
import JoinGame from '@/components/JoinGame';
import StartHosting from '@/components/StartHosting';
import usePageError from '@/hooks/usePageError';
import useInvitation from '@/hooks/useInvitation';

const Home = () => {

    const { session } = useAuthContext();

    const { pageError, setPageError } = usePageError();
    const [submitted, setSubmitted] = useState(false)

    useInvitation();

    return (
        <>
            <main className="flex p-6 min-h-[100dvh]">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 ">
                    <div className='md:col-span-2 flex flex-1 items-center bg-[#e4b7dd] rounded-3xl'>
                        <img className='w-[600px] m-auto' src={Gamelogo} alt="Game logo" />
                    </div >
                    <div className="p-4 rounded-xl flex flex-col flex-1 border-2">
                        <div className="flex flex-col flex-1 justify-center items-center max-w-full md:max-w-96 md:mx-auto">
                            {pageError && (
                                <div className='w-full top-0 text-center p-2 rounded my-4 bg-destructive text-destructive-foreground justify-self-start'>
                                    <p>{pageError}</p>
                                    <p>Request a new link!</p>
                                </div>
                            )}
                            {session && (
                                <StartHosting />
                            )}
                            {!session && (
                                <div className='grid gap-16 w-full'>
                                    <div className='flex-1 w-full'>
                                        <Signup submitted={submitted} setSubmitted={setSubmitted} setPageError={setPageError} />
                                    </div>
                                    <div className='flex-1 w-full'>
                                        <JoinGame />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main >
            <Footer />
        </>

    );
};

export default Home;