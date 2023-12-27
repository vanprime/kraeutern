import React from 'react';
import { motion } from 'framer-motion';
import { splitTextByWord, splitTextByChar } from "@/lib/textSplitters";

const SpellingText = ({ text = "", fontClasses = "", containerClasses = "" }) => {
    if (!text) return null;

    // Define your animation variants for each letter with overshoot
    const letterVariants = {
        initial: { opacity: 0, y: 20 },
        animate: i => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                type: "spring",
                stiffness: 100,
                damping: 8,
                mass: 0.5
            }
        })
    };


    const renderText = () => {
        const shouldSplitByWord = text.includes(' ');
        const splitMethod = shouldSplitByWord ? splitTextByWord : splitTextByChar;
        const splitText = splitMethod(text);

        return splitText.map(({ word, wordIndex }) => (
            <span key={wordIndex} className="inline-block mr-2">
                {word.map(({ char, charIndex }) => (
                    <motion.span
                        key={charIndex}
                        variants={letterVariants}
                        custom={wordIndex + charIndex / 10}
                        className={fontClasses}
                    >
                        {char}
                    </motion.span>
                ))}
            </span>
        ));
    };

    return (
        <motion.div
            key={text}
            initial="initial"
            animate="animate"
            exit="exit"
            className={containerClasses}
        >
            {renderText()}
        </motion.div>
    );
};

export default SpellingText;
