import { letters } from '../../../data/letters';

const playLetters = (letter: string) => {
    const soundPath = `/sound/alphabet-adventure/letters/letter-${letter[1]}.mp3`
    const audio = new Audio(soundPath)
    audio.play()
};

const playSoundAnswer = (isCorrect: boolean) => {
    const pathSound = isCorrect ? `/sound/alphabet-adventure/game-won.mp3` : `/sound/alphabet-adventure/game-fail.mp3`
    const audio = new Audio(pathSound)
    audio.play()
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

    setDisabledButton(true)

    if (firstLetter === answerLetter) {
        setCorrectedAnswer(true)
        setMessage('Дуже добре Сергійко!')
        playSoundAnswer(true)
    } else {
        setCorrectedAnswer(false)
        setMessage('Не вірно, спробуй ще раз!')
        playSoundAnswer(false)
    }

    setTimeout(() => {
        setCorrectedAnswer(false)
        setMessage('')
        setAnswer('')
        setDisabledButton(false)
        if (firstLetter === answerLetter) {
            genereteLetter()
        }
    }, 5000)

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
    setDisabledButton
}: SpeechToTextParams, timeClearMessage: React.MutableRefObject<NodeJS.Timeout | null>) => {
    if (typeof window === "undefined") return

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Recognition) return

    const recognition = new Recognition()
    recognition.lang = "en-US"
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    let timeoutId: NodeJS.Timeout
    let answer = ''

    recognition.onstart = () => {
        if (timeClearMessage.current) {
            clearTimeout(timeClearMessage.current);
        }

        setIsListening(true)
        setMessage("")
        answer = ''
        timeoutId = setTimeout(() => recognition.stop(), 5000)
    };

    recognition.onspeechend = () => {
        recognition.stop()
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
        clearTimeout(timeoutId);
        recognition.stop();

        const transcript = event.results[0][0].transcript
        answer = transcript
        setAnswer(transcript.split(' ')[0])

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
        setIsListening(false)
        clearTimeout(timeoutId)

        if (!answer) {
            setMessage("Не почув відповіді, спробуй ще раз.")
            timeClearMessage.current = setTimeout(() => setMessage(""), 5000)
        } else {
            if (timeClearMessage.current) {
                clearTimeout(timeClearMessage.current);
            }
        }
    };

    recognition.onerror = (event) => {
        console.error("❌ Помилка розпізнавання:", event.error)
        setIsListening(false)
        clearTimeout(timeoutId)
        recognition.abort()
    };

    recognition.start()
};

export { playLetters, generateRandomLetter, checkAnswer, speechToText };


