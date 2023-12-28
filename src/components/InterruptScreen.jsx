import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import SpellingText from './SpellingText';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

export const InterruptScreen = ({ children, title, description, callback }) => {
    return (
        <div className='flex flex-col p-9 my-auto bg-muted rounded-xl text-center mx-auto bg-gradient-to-b from-cyan-950 to-purple-950 shadow-2xl shadow-purple-800 border-2 border-slate-50'>
            <SpellingText text={title} fontClasses='font-semibold tracking-wide text-[8rem] text-slate-50 inline-block' />
            <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
            >
                {description && <p className='text-muted-foreground'>{description}</p>}
            </motion.div>
            {children}
            {!!callback && (<div className='flex justify-center mt-9'>
                <Button onClick={callback}><Play /></Button>
            </div>)}
        </div>
    );
};
