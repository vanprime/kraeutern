import { container } from '@/lib/animationProps';
import { useGamestateContext } from '@/providers/gamestate-provider';
import { motion } from 'framer-motion';
import { Link, Outlet } from 'react-router-dom';

const Buzzerlayout = () => {
    const { gameRoom, joinRoomId } = useGamestateContext();

    //since joinRoomId takes precedence it's the early return
    if (joinRoomId) {
        return (
            <>
                <motion.div
                    className="w-full text-center text-sm px-6 py-2 bg-purple-900"
                    variants={container} initial="hidden" animate="show"
                >
                    <p> Subscribed to Game ID: {joinRoomId}</p>
                </motion.div>
                <main className='flex flex-1 flex-col pb-6'>
                    <Outlet />
                </main>
            </>
        )
    }

    return (
        <>
            {gameRoom?.room_id && (
                <motion.div
                    className="w-full text-center text-sm px-6 py-2 bg-green-900"
                    variants={container} initial="hidden" animate="show"
                >
                    <p> Subscribed to Game ID: {gameRoom.room_id}</p>
                </motion.div>
            )}
            {!gameRoom?.room_id && (
                <motion.div
                    className="w-full text-center text-sm px-6 py-2 bg-destructive space-x-4"
                    variants={container} initial="hidden" animate="show"
                >
                    <p className='inline-block'> No active game!</p> <Link to="/" className='inline-block hover:underline'> go back and join a game</Link>
                </motion.div>
            )}
            <main className='flex flex-1 flex-col pb-6'>
                <Outlet />
            </main>
        </>
    );
};

export default Buzzerlayout;