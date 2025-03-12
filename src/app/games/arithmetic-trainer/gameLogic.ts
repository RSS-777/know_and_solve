import { Dispatch } from 'react';

let firstNumber: number | null = null;
let secondNumber: number | null = null;
let result: number = 0;

type TProps = {
    endNumber: number,
    choiceOperation: string,
    setFirstNumb: Dispatch<React.SetStateAction<number | string>>;
    setLastNumb: Dispatch<React.SetStateAction<number | string>>;
    setResultNumb: Dispatch<React.SetStateAction<number | null>>;
    setListNumb: Dispatch<React.SetStateAction<number[]>>;
};

const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const anyNumbers = (endNumber: number) => {
    let arrNumber: number[] = [];
    let count = 6;

    if (firstNumber !== null && secondNumber !== null) {
        while (arrNumber.length < count) {
            const randomNum = Math.ceil(Math.random() * endNumber);

            if (!arrNumber.includes(randomNum) && result !== randomNum) {
                arrNumber.push(randomNum);
            }
        }
    }
    return arrNumber;
};

export const handleStart = ({
    endNumber,
    choiceOperation,
    setFirstNumb,
    setLastNumb,
    setResultNumb,
    setListNumb,
}: TProps) => {
    const getRandomNumber = (max: number) => Math.floor(Math.random() * max) + 1;

    const generateNumbers = (choice: string) => {
        let firstNum: number | null = null;
        let secondNum: number | null = null;

        do {
            if (choice === '+' || choice === '*') {
                firstNum = getRandomNumber(endNumber / 2);
                secondNum = getRandomNumber(endNumber / 2);
            } else {
                firstNum = getRandomNumber(endNumber);
                secondNum = getRandomNumber(endNumber);
            }
        } while (
            (firstNum === firstNumber || secondNum === secondNumber) ||
            (choice === '-' && firstNum < secondNum) ||
            (choice === '/' && firstNum % secondNum !== 0)
        );

        writeNumbers('firstNumber', firstNum);
        writeNumbers('secondNumber', secondNum);
        calculateResult(choice);
    };

    const writeNumbers = (value: string, numb: number | null) => {
        if (value === 'firstNumber') firstNumber = numb;
        if (value === 'secondNumber') secondNumber = numb;
    };

    const calculateResult = (choice: string) => {
        if (firstNumber === null || secondNumber === null) return;
        switch (choice) {
            case '+': result = firstNumber + secondNumber; break;
            case '-': result = firstNumber - secondNumber; break;
            case '*': result = firstNumber * secondNumber; break;
            case '/': result = firstNumber / secondNumber; break;
        }
    };

    generateNumbers(choiceOperation);

    if (firstNumber && secondNumber && result !== undefined) {
        setFirstNumb(firstNumber);
        setLastNumb(secondNumber);
        setResultNumb(result);
        setListNumb(shuffleArray([result, ...anyNumbers(endNumber)]));
    }
};