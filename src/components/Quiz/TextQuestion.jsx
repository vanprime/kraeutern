import { motion } from 'framer-motion';

export const TextQuestion = ({ question }) => {

    return (
        <motion.p
            key={question}
            initial={{ x: '-1ch', opacity: 0, scale: 0.99, }}
            animate={{ x: 0, opacity: 1, scale: 1, }}
            transition={{ duration: 0.25 }}
            className='font-semibold tracking-wide text-[3.8vw] leading-tight text-indigo-950 text-center'>
            {question}
        </motion.p>
    )
}

export default TextQuestion;