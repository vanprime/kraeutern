import GraphemeSplitter from 'grapheme-splitter';

// Initialize GraphemeSplitter
const splitter = new GraphemeSplitter();

// Function for splitting text into individual characters (including emojis)
export const splitTextByChar = (text) => {
    return splitter.splitGraphemes(text).map((char, index) => ({ char, index }));
};

// Function for splitting text into words and then into characters
export const splitTextByWord = (text) => {
    return text.split(' ').map((word, wordIndex) => {
        return {
            word: word.split('').map((char, charIndex) => ({ char, charIndex })),
            wordIndex
        };
    });
};