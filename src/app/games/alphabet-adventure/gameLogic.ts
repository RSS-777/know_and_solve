import { letters } from '../../../data/letters';

const playLetters = (letter: string) => {
    const soundPath = `/sound/alphabet-adventure/letters/letter-${letter[1]}.mp3`
    const audio = new Audio(soundPath);
    audio.play();
};

const playSoundAnswer = (isCorrect: boolean) => {
    console.log('playSound', isCorrect)
    const pathSound = isCorrect ? `/sound/alphabet-adventure/game-won.mp3` : `/sound/alphabet-adventure/game-fail.mp3`;
    const audio = new Audio(pathSound);
    audio.play();
};

const generateRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * letters.length)
    const letter = letters[randomIndex]
    return letter
};

type TypeCheckAnswerParams = {
    letter: string;
    answer: string;
    genereteLetter: () => void;
    setCorrectedAnswer: React.Dispatch<React.SetStateAction<boolean>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setDisabledButton: React.Dispatch<React.SetStateAction<boolean>>;
    setAnswer: React.Dispatch<React.SetStateAction<string>>;
};

const checkAnswer = ({ letter, answer, genereteLetter, setCorrectedAnswer, setMessage, setDisabledButton, setAnswer }: TypeCheckAnswerParams) => {
    const firstLetter = letter.toUpperCase().split('')[0]
    const answerLetter = answer.toUpperCase().split('')[0]

    if (firstLetter === answerLetter) {
        setCorrectedAnswer(true)
        setMessage('Дуже добре Сергійко!')
        setDisabledButton(true)
        playSoundAnswer(true)

        setTimeout(() => {
            setCorrectedAnswer(false)
            setMessage('')
            genereteLetter()
            setAnswer('')
            setDisabledButton(false)
        }, 5000)
    } else {
        setCorrectedAnswer(false)
        setMessage('Не вірно, спробуй ще раз!')
        setDisabledButton(true)
        playSoundAnswer(false)

        setTimeout(() => {
            setMessage('')
            setAnswer('')
            setDisabledButton(false)
        }, 5000)
    }
};

type SpeechToTextParams = {
    setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setAnswer: React.Dispatch<React.SetStateAction<string>>;
    checkAnswer: (params: {
        letter: string;
        answer: string;
        genereteLetter: () => void;
        setCorrectedAnswer: React.Dispatch<React.SetStateAction<boolean>>;
        setMessage: React.Dispatch<React.SetStateAction<string>>;
        setDisabledButton: React.Dispatch<React.SetStateAction<boolean>>;
        setAnswer: React.Dispatch<React.SetStateAction<string>>;
    }) => void;
    letter: string;
    genereteLetter: () => void;
    setCorrectedAnswer: React.Dispatch<React.SetStateAction<boolean>>;
    setDisabledButton: React.Dispatch<React.SetStateAction<boolean>>;
};

const speechToText = ({
    setIsListening,
    setMessage,
    setAnswer,
    checkAnswer,
    letter,
    genereteLetter,
    setCorrectedAnswer,
    setDisabledButton,
}: SpeechToTextParams) => {
    if (typeof window === "undefined") return;

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return;

    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let timeoutId: NodeJS.Timeout;

    recognition.onstart = () => {
        setIsListening(true);
        setMessage("");
        timeoutId = setTimeout(() => recognition.stop(), 5000);
    };

    recognition.onspeechend = () => {
        recognition.stop();
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
        clearTimeout(timeoutId);
        recognition.stop();

        const transcript = event.results[0][0].transcript;
        setAnswer(transcript);

        if (transcript && letter) {
            checkAnswer({
                letter,
                answer: transcript,
                genereteLetter,
                setCorrectedAnswer,
                setMessage,
                setDisabledButton,
                setAnswer,
            });
        }
    };

    recognition.onend = () => {
        setIsListening(false);
        clearTimeout(timeoutId);

        setAnswer((prevAnswer) => {
            if (!prevAnswer.trim()) {
                setMessage("Не почув відповіді, спробуй ще раз.");
                setTimeout(() => setMessage(""), 5000);
            }
            return prevAnswer;
        });
    };

    recognition.onerror = (event) => {
        console.error("❌ Помилка розпізнавання:", event.error);
        setIsListening(false);
        clearTimeout(timeoutId);
        recognition.abort();
    };

    recognition.start();
};

export { playLetters, generateRandomLetter, checkAnswer, speechToText }