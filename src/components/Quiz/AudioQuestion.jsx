import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export const AudioQuestion = ({ question }) => {

    const audioRef = useRef(new Audio());

    useEffect(() => {
        const loadAudio = async () => {
            try {
                const audioURL = question;
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
            } catch (error) {
                toast.error('Failed to load audio', { description: error, autoClose: 5000 });
                console.error('Failed to load audio:', error);
            }
        };

        if (question) {
            loadAudio();
        }
    }, [question]);

    return (
        <audio controls ref={audioRef}>
            Your browser does not support the audio element.
        </audio>
    );
};

export default AudioQuestion;