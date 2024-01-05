import { motion } from 'framer-motion';
import ImageQuestion from './ImageQuestion';
import EmojiQuestion from './EmojiQuestion';
import TextQuestion from './TextQuestion';
import AudioQuestion from './AudioQuestion';

export const QuestionDisplay = ({ question, question_type, roundIndex }) => {

    switch (question_type) {
        case 'image':
            return (
                <ImageQuestion question={question} roundIndex={roundIndex} />
            )
        case 'emoji':
            return (
                <EmojiQuestion question={question} roundIndex={roundIndex} />
            )
        case 'audio':
            return (
                <AudioQuestion question={question} roundIndex={roundIndex} />
            )
        default:
            return (
                <TextQuestion question={question} roundIndex={roundIndex} />
            )
    }
}

export default QuestionDisplay;