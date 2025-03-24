import { RefObject, Dispatch, SetStateAction } from "react";

const generateRandomNumb = (number: number) => {
    const numb = Math.ceil(Math.random() * number)
    return numb
};

const generateSign = (arrSign: string[]) => {
    const numb = Math.floor(Math.random() * arrSign.length)
    return arrSign[numb]
};

type TypeSoundParams = {
    index: number;
    soundPath: string;
    audioRef: RefObject<HTMLAudioElement[]>;
};

const playSound = ({index, soundPath, audioRef}: TypeSoundParams) => {
    if (!audioRef.current[index]) {
        audioRef.current[index] = new Audio(soundPath)
    }

    audioRef.current[index].play()

    setTimeout(() => {
        audioRef.current[index].pause();
        audioRef.current[index].currentTime = 0;
    }, 10000)
}

type TypeClearValuesParams = {
    setOneNumber: Dispatch<SetStateAction<number>>;
    setTwoNumber: Dispatch<SetStateAction<number>>;
    setThreeNumber: Dispatch<SetStateAction<number>>;
    setResult: Dispatch<SetStateAction<number | null>>;
    setAnswer?: Dispatch<SetStateAction<number | null>>;
    inputRef?: RefObject<HTMLInputElement | null>;

}

const clearValues = ({
    setOneNumber,
    setTwoNumber,
    setThreeNumber,
    setResult,
    setAnswer,
    inputRef,
}: TypeClearValuesParams): void => {
    setOneNumber(0);
    setTwoNumber(0);
    setThreeNumber(0);
    setResult(null);
    if (setAnswer) setAnswer(null);
    if (inputRef?.current) inputRef.current.value = '';
};

type TypeParamsCalc = {
    oneSign: string,
    twoSign: string,
    oneNumber: number,
    twoNumber: number,
    threeNumber: number
}

const calculate = ({ oneSign, twoSign, oneNumber, twoNumber, threeNumber }: TypeParamsCalc) => {
    let result = 0

    if (oneSign === '+' && twoSign === '+') result = oneNumber + twoNumber + threeNumber
    if (oneSign === '-' && twoSign === '-') result = oneNumber - twoNumber - threeNumber
    if (oneSign === '-' && twoSign === '+') result = oneNumber - twoNumber + threeNumber
    if (oneSign === '+' && twoSign === '-') result = oneNumber + twoNumber - threeNumber

    if (oneSign === '*' && twoSign === '*') result = oneNumber * twoNumber * threeNumber
    if (oneSign === '*' && twoSign === '+') result = oneNumber * twoNumber + threeNumber
    if (oneSign === '*' && twoSign === '-') result = oneNumber * twoNumber - threeNumber
    if (oneSign === '+' && twoSign === '*') result = oneNumber + (twoNumber * threeNumber)
    if (oneSign === '-' && twoSign === '*') result = oneNumber - (twoNumber * threeNumber)

    if (oneSign === '/' && twoSign === '/') result = oneNumber / twoNumber / threeNumber
    if (oneSign === '/' && twoSign === '+') result = oneNumber / twoNumber + threeNumber
    if (oneSign === '/' && twoSign === '-') result = oneNumber / twoNumber - threeNumber
    if (oneSign === '+' && twoSign === '/') result = oneNumber + (twoNumber / threeNumber)
    if (oneSign === '-' && twoSign === '/') result = oneNumber - (twoNumber / threeNumber)

    return result
}

type TypeStartGameParams = TypeClearValuesParams & {
    selectedOperator: string[];
    buttonRef: RefObject<HTMLButtonElement | null>;
    setNumberQuestions: Dispatch<SetStateAction<number>>;
    setOneSign: Dispatch<SetStateAction<string>>;
    setTwoSign: Dispatch<SetStateAction<string>>;
    setError: Dispatch<SetStateAction<string>>;
    range: number;
    styles: Record<string, string>;
}

const handleStartGame = ({
    selectedOperator,
    buttonRef,
    setNumberQuestions,
    setOneNumber,
    setTwoNumber,
    setThreeNumber,
    setOneSign,
    setTwoSign,
    setResult,
    setError,
    range,
    styles
}: TypeStartGameParams) => {
    if (selectedOperator.length > 0) {
        let firstNum = generateRandomNumb(range)
        let secondNum = generateRandomNumb(range)
        let threeNumb = generateRandomNumb(range)
        buttonRef.current?.classList.add(styles['not-active'])
        setNumberQuestions(prev => prev = ++prev)

        const oneS = generateSign(selectedOperator);
        const twoS = generateSign(selectedOperator);

        // Логіка для віднімання першого знаку
        if (oneS === '-') {
            if (firstNum < secondNum) {
                [firstNum, secondNum] = [secondNum, firstNum]
            }

            if (twoS === '-') {
                threeNumb = (firstNum - secondNum < threeNumb) ? generateRandomNumb(firstNum - secondNum) : threeNumb
            }

            if (twoS === '/') {
                while (secondNum % threeNumb !== 0 || (firstNum - (secondNum / threeNumb)) < 0) {
                    firstNum = generateRandomNumb(range);
                    secondNum = generateRandomNumb(range);
                    threeNumb = generateRandomNumb(range / 2);
                }
            }

            if (twoS === '*') {
                secondNum = generateRandomNumb(range / 2);
                threeNumb = generateRandomNumb(range / 2);

                if ((firstNum - (secondNum * threeNumb)) < 0) {
                    firstNum = (secondNum * threeNumb)
                }
            }
        }

        // Логіка для множення 
        if (oneS === '*') {
            if (firstNum * secondNum < threeNumb) {
                threeNumb = generateRandomNumb(firstNum * secondNum)
            }

            if (twoS === '*') {

            }
        }

        // Логіка для ділення 
        if (oneS === '/') {
            if (twoS === '/') {

            }
        }

        setOneNumber(firstNum);
        setTwoNumber(secondNum);
        setThreeNumber(threeNumb);
        setOneSign(oneS);
        setTwoSign(twoS);

        const result = calculate({
            oneSign: oneS,
            twoSign: twoS,
            oneNumber: firstNum,
            twoNumber: secondNum,
            threeNumber: threeNumb
        });

        setResult(result);
    } else {
        setError('Оберіть хоча б один математичний знак!')
        setTimeout(() => { setError('') }, 3000)
    }

};

type TypeStopGameParams = {
    buttonRef: RefObject<HTMLButtonElement | null>;
    blockInfoGamesRef: RefObject<HTMLDivElement | null>;
    containerGamesRef: RefObject<HTMLDivElement | null>;
    setGameEnd: Dispatch<SetStateAction<boolean>>;
    setNumberQuestions: Dispatch<SetStateAction<number>>;
    setCorrectAnswer: Dispatch<SetStateAction<number>>;
    setIncorrectAnswer: Dispatch<SetStateAction<number>>;
    styles: Record<string, string>;
}

const handleStopGame = ({ buttonRef, blockInfoGamesRef, containerGamesRef, setGameEnd, setNumberQuestions, setIncorrectAnswer, setCorrectAnswer, styles }: TypeStopGameParams) => {
    buttonRef.current?.classList.remove(styles['not-active'])
    blockInfoGamesRef.current?.classList.add(styles['show-information-block'])
    containerGamesRef.current?.classList.add(styles['hidden-element'])
    setGameEnd(true)

    setTimeout(() => {
        setNumberQuestions(0)
        setIncorrectAnswer(0)
        setCorrectAnswer(0)
        setGameEnd(false)
        blockInfoGamesRef.current?.classList.remove(styles['show-information-block'])
        containerGamesRef.current?.classList.remove(styles['hidden-element'])
    }, 5000)
}

type TypeAnswerParams = Pick<TypeStopGameParams, 'setCorrectAnswer' | 'setIncorrectAnswer' | 'setGameEnd' | 'styles'> & {
    setAnswer: Dispatch<SetStateAction<number | null>>;
    audioRef: RefObject<HTMLAudioElement[]>;
    inputRef: RefObject<HTMLInputElement | null>;
    resultRef: RefObject<HTMLDivElement | null>;
    numberQuestions: number;
    answer: number | null;
    result: number | null;
} & TypeStartGameParams;

const handleAnswer = ({
    setAnswer,
    setCorrectAnswer,
    setIncorrectAnswer,
    setGameEnd,
    audioRef,
    inputRef,
    resultRef,
    numberQuestions,
    answer,
    result,
    styles,
    selectedOperator,
    buttonRef,
    setNumberQuestions,
    setOneNumber,
    setTwoNumber,
    setThreeNumber,
    setOneSign,
    setTwoSign,
    setResult,
    setError,
    range
}: TypeAnswerParams) => {
    if (answer === result) {
        setAnswer(null)
        setCorrectAnswer(prev => prev = prev + 1)
        playSound({ index: 1, soundPath: '/sound/mathematical/ok.mp3', audioRef });
        inputRef.current?.classList.add(styles['hidden-input'])
        resultRef.current?.classList.add(styles['answer-correct'])


        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.value = "";
            }
            inputRef.current?.classList.remove(styles['hidden-input'])
            resultRef.current?.classList.remove(styles['answer-correct'])

            if (numberQuestions === 20) {
                setGameEnd(true)
                return
            } else {
                handleStartGame({
                    selectedOperator,
                    buttonRef,
                    setNumberQuestions,
                    setOneNumber,
                    setTwoNumber,
                    setThreeNumber,
                    setOneSign,
                    setTwoSign,
                    setResult,
                    setError,
                    range,
                    styles
                })
            }
        }, 3000)
    } else {
        setAnswer(null)
        setIncorrectAnswer(prev => prev = prev + 1)
        playSound({ index: 2, soundPath: '/sound/mathematical/fail_2.mp3', audioRef });
        inputRef.current?.classList.add(styles['hidden-input'])
        resultRef.current?.classList.add(styles['answer-not-correct'])

        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.value = "";
            }
            inputRef.current?.classList.remove(styles['hidden-input'])
            resultRef.current?.classList.remove(styles['answer-not-correct'])

            if (numberQuestions === 20) {
                setGameEnd(true)
                playSound({ index: 3, soundPath: '/sound/mathematical/win.mp3', audioRef });
                return
            } else {
                handleStartGame({
                    selectedOperator,
                    buttonRef,
                    setNumberQuestions,
                    setOneNumber,
                    setTwoNumber,
                    setThreeNumber,
                    setOneSign,
                    setTwoSign,
                    setResult,
                    setError,
                    range,
                    styles
                })
            }
        }, 3000)
    }
}

export { clearValues, handleStartGame, handleStopGame, handleAnswer, playSound };