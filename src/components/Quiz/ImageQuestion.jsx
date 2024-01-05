import ImageLoading from '@/components/ImageLoading';

export const ImageQuestion = ({ question, roundIndex }) => {
    return (
        <ImageLoading urlString={question} alt={`image for round ${roundIndex}`} />
    )
}

export default ImageQuestion;