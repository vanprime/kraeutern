import { useState } from 'react';
import { motion } from 'framer-motion';
import Signup from '@/components/Signup';
import { useAuthContext } from '@/providers/auth-provider';
import JoinGame from '@/components/JoinGame';
import StartHosting from '@/components/StartHosting';
import usePageError from '@/hooks/usePageError';
import useInvitation from '@/hooks/useInvitation';
import { container, item } from '@/lib/animationProps';
import SubscriptionHint from '@/components/SubscriptionHint';

const Home = () => {

    const { session } = useAuthContext();

    const { pageError, setPageError } = usePageError();
    const [submitted, setSubmitted] = useState("")

    useInvitation();

    return (
        <div className="flex flex-col flex-1 justify-center items-center max-w-full md:w-96 md:mx-auto">
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
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className='grid gap-16 w-full'>
                    <motion.div
                        variants={item}
                        className='flex-1 w-full'
                    >
                        {!submitted && <Signup setSubmitted={setSubmitted} setPageError={setPageError} />}
                        {submitted && <SubscriptionHint />}
                    </motion.div>
                    <motion.div
                        variants={item}
                        layout
                        className='flex-1 w-full'
                    >
                        <JoinGame />
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Home;