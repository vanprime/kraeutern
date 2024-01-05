import { motion } from 'framer-motion';

export const EmojiQuestion = ({ question }) => {

    return (
        <motion.p
            key={question}
            initial={{ x: '-1ch', opacity: 0, scale: 0.99, }}
            animate={{ x: 0, opacity: 1, scale: 1, }}
            transition={{ duration: 0.25 }}
            className='tracking-wide text-[6rem] md:text-[8rem] lg:text-[12rem] leading-tight'>
            {question}
        </motion.p>
    )
}

export default EmojiQuestion;