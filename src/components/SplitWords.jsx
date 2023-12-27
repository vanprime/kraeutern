import React from 'react';
import { motion } from 'framer-motion';
import { splitTextByWord } from "@/lib/textSplitters";

const SplitWords = ({ word, className = "" }) => {
    // Define your animation variants for each letter
    const letterVariants = {
        initial: { opacity: 0, y: 20 },
        animate: i => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05, // Delay each letter progressively
                type: "spring",   // Use spring physics for the animation
                stiffness: 100,   // How stiff the spring is
                damping: 8,       // How the spring slows down
                mass: 0.5         // The mass of the element being moved
            }
        })
    };

    return (
        <motion.div
            key={word}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {splitTextByWord(word).map(({ word, wordIndex }) => (
                <span key={wordIndex} className="inline-block mr-2"> {/* Add space between words */}
                    {word.map(({ char, charIndex }) => (
                        <motion.span
                            key={charIndex}
                            variants={letterVariants}
                            custom={wordIndex + charIndex / 10} // Adjust custom delay for smooth animation
                            className={className}
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.div>
    )
};

export default SplitWords;
