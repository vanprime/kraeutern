import { Button } from '@/components/ui/button';
import { Cctv } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { container, item } from '@/lib/animationProps';

const Teamselect = () => {

    return (
        <main className='flex flex-1 p-6'>
            <div className='flex flex-1 items-center bg-slate-900 rounded-3xl flex-col p-9'>
                <h1 className='text-2xl font-semibold'>Select your Team</h1>
                <motion.div
                    variants={container} initial="hidden" animate="show"
                    className="flex flex-col flex-1 p-9 justify-around"
                >
                    {Array.from({ length: 4 }).map((_, index) => {
                        return (
                            <motion.div
                                key={index + "modiv"}
                                variants={item}
                            >
                                <Button asChild className="m-9 flex p-9">
                                    <Link className='text-xl font-semibold' to={"/buzzern/" + (index + 1)}>{index + 1}</Link>
                                </Button>
                            </motion.div>
                        )
                    })}
                    <Button asChild variant="secondary" className="m-9 flex p-9">
                        <Link className='text-xl font-semibold' to={'/buzzern/blank'}><Cctv /></Link>
                    </Button>
                </motion.div>
            </div>
        </main>
    );
};

export default Teamselect;