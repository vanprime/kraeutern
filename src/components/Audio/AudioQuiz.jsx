// AudioQuiz component
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { InterruptScreen } from '@/components/InterruptScreen';
import useQuiz from '@/hooks/useQuiz';
import Overshooter from '@/components/Overshooter';

const AudioQuiz = ({ game }) => {

    const pausePoints = [30]; // Define your pause points
    const {
        questions,
        gameState,
        goToNextQuestion,
        goToPreviousQuestion,
        resumeQuiz,
        toggleSolution,
    } = useQuiz(game, pausePoints);

    const audioRef = useRef(new Audio());
    const [audioSrc, setAudioSrc] = useState('');

    useEffect(() => {
        if (gameState.currentQuestionIndex >= 0 && questions.length > 0) {
            setAudioSrc(questions[gameState.currentQuestionIndex].question);
        }
    }, [gameState.currentQuestionIndex, questions]);

    useEffect(() => {
        const loadAudio = async () => {
            const audioURL = questions[gameState.currentQuestionIndex].question;
            const cacheName = 'audio-cache';
            const cache = await caches.open(cacheName);
            const cachedResponse = await cache.match(audioURL);

            if (cachedResponse) {
                audioRef.current.src = URL.createObjectURL(await cachedResponse.blob());
            } else {
                const response = await fetch(audioURL);
                if (response.ok) {
                    cache.put(audioURL, response.clone());
                    audioRef.current.src = audioURL;
                }
            }
            audioRef.current.load();
        };

        if (gameState.currentQuestionIndex >= 0 && questions.length > 0) {
            loadAudio();
        }
    }, [gameState.currentQuestionIndex, questions]);


    //pause screen
    if (gameState.isPaused) {
        return (
            <InterruptScreen
                title={'Pause!'}
                description={'Kurz mal durchatmen, mit dem Button unten geht\'s weiter!'}
                callback={resumeQuiz} />
        )
    }

    return (
        <>
            <Overshooter />
            {questions.length > 0 && (
                <div className='flex flex-1 flex-col'>
                    <div className='py-9 px-16 grid grid-rows-2 rounded bg-gradient-light-blue bg-180 animate-gradient-animation flex-1'>
                        <div className='flex flex-1 flex-col justify-between'>
                            <div className="flex flex-row text-muted-foreground text-xl">
                                <p className='mr-[0.5ch]'>
                                    Round
                                </p>
                                <motion.p
                                    key={gameState.currentQuestionIndex}  // Add the key prop
                                    initial={{ y: '0.5ch', opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {gameState.currentQuestionIndex + 1}
                                </motion.p>
                            </div>
                            <div className="flex flex-1 flex-col justify-around p-9 items-center">
                                <audio controls src={audioSrc}>
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            {gameState.showSolution && (
                                <motion.p
                                    key={gameState.showSolution}
                                    initial={{ x: '2ch', opacity: 0, scale: 0.99, }}
                                    animate={{ x: 0, opacity: 1, scale: 1, }}
                                    transition={{ duration: 0.25 }}
                                    className='font-semibold text-[3rem] text-purple-700'>
                                    {questions[gameState.currentQuestionIndex].solution}
                                </motion.p>
                            )
                            }
                        </div>
                    </div >
                    <div className='pt-4 flex justify-between mt-auto'>
                        <Button
                            variant="secondary"
                            onClick={goToPreviousQuestion}
                            disabled={gameState.currentQuestionIndex === 0}>
                            <ArrowLeft />
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={toggleSolution}>
                            {gameState.showSolution ? 'Hide Solution' : 'Show Solution'}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={goToNextQuestion}
                            disabled={gameState.currentQuestionIndex === questions.length - 1}
                        >
                            <ArrowRight />
                        </Button>
                    </div>
                </div >
            )}
        </ >
    );
};

export default AudioQuiz;
