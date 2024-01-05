import { motion } from 'framer-motion';

export const RoundDisplay = ({ roundIndex }) => {
    return (
        <div className="flex flex-row text-muted-foreground text-xl">
            <p className='mr-[0.5ch]'>
                Question
            </p>
            <motion.p
                key={roundIndex}  // Add the key prop
                initial={{ y: '0.5ch', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
            >
                {roundIndex + 1}
            </motion.p>
        </div>
    )
}

export default RoundDisplay;