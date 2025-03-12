"use client"
import { useState, useRef, useEffect } from "react";
import { ButtonGames } from "../../../components/ButtonGames";
import styles from '../../../styles/games/arithmetic.module.scss';
import { handleStart } from './gameLogic';
const successSound = '/sound/arithmetic/success.mp3';
const failSound = '/sound/arithmetic/fail.mp3';
const fireWorkSound = '/sound/arithmetic/firework.mp3';

const playSuccessSound = (isSuccess: boolean = false) => {
    if (isSuccess) {
        const audio = new Audio(successSound);
        audio.play();
    } else {
        const audio = new Audio(failSound);
        audio.play();
    }
};

const Arithmetic = () => {
    const [choiceOperation, setChoiceOperation] = useState<string>('+')
    const [firstNumb, setFirstNumb] = useState<number | string>('')
    const [lastNumb, setLastNumb] = useState<number | string>('')
    const [resultNumb, setResultNumb] = useState<number | null>(null)
    const [endNumber, setEndNumber] = useState<number>(10)
    const [listNumb, setListNumb] = useState<number[]>([])
    const [correctAnswer, setCorrectAnswer] = useState<number>(0)
    const [incorrectAnswer, setIncorrectAnswer] = useState<number>(0)
    const [answerOk, setAnswerOk] = useState<boolean>(false)
    const [winGame, setWinGame] = useState<boolean>(false)
    const [count, setCount] = useState<number | null>(null)
    const oneOperand = useRef<HTMLInputElement>(null)
    const twoOperand = useRef<HTMLInputElement>(null)
    const ulRef = useRef<HTMLUListElement | null>(null);
    const buttonStartRef = useRef<HTMLButtonElement>(null)
    const liElementRefs = useRef<(HTMLLIElement | null)[]>([]);
    const refOctionSetting = useRef<HTMLSelectElement | null>(null)
    const refRangSetting = useRef<HTMLSelectElement | null>(null)
    const timerCorrected = useRef<ReturnType<typeof setTimeout> | null>(null);
    const winAudioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        winAudioRef.current = new Audio(fireWorkSound);
    }, [])

    const playWinSound = () => {
        if (winAudioRef.current) {
            winAudioRef.current.loop = true;
            winAudioRef.current.play();
        }
    };

    const handleChangeRange = (numb: number) => {
        setEndNumber(numb)
    }

    const handleStartGame = () => {
        buttonStartRef.current?.classList.add(styles['unclickable-button'])
        refOctionSetting.current?.classList.add(styles.unclickable)
        refRangSetting.current?.classList.add(styles.unclickable)
        setCount(20)
        setAnswerOk(false)
        setCorrectAnswer(0)
        setIncorrectAnswer(0)
        handleStart({ endNumber, choiceOperation, setFirstNumb, setLastNumb, setResultNumb, setListNumb })
    }

    const handleStopGame = () => {
        if (timerCorrected.current) {
            clearTimeout(timerCorrected.current)
        }
        ulRef.current?.classList.remove(styles.unclickable)
        buttonStartRef.current?.classList.remove(styles['unclickable-button'])
        refOctionSetting.current?.classList.remove(styles.unclickable)
        refRangSetting.current?.classList.remove(styles.unclickable)
        setCount(null)
        setFirstNumb('')
        setLastNumb('')
        setResultNumb(null)
        setListNumb([])
    }

    const handleChoiceAnswer = (text: string | null, ind: number) => {
        if (timerCorrected.current) {
            clearTimeout(timerCorrected.current)
        }

        if (resultNumb === Number(text)) {
            setCorrectAnswer(prev => prev + 1)
            ulRef.current?.classList.add(styles.unclickable)
            liElementRefs.current[ind]?.classList.add(styles['correct-answer'])
            setAnswerOk(true)
            playSuccessSound(true)

            timerCorrected.current = setTimeout(() => {
                handleStart({ endNumber, choiceOperation, setFirstNumb, setLastNumb, setResultNumb, setListNumb })
                setAnswerOk(false)
                setCount(prev => (prev !== null) ? prev - 1 : prev)
                ulRef.current?.classList.remove(styles.unclickable)
                liElementRefs.current.forEach((el) => {
                    el?.classList.remove(styles['incorrect-answer'])
                    el?.classList.remove(styles['correct-answer'])
                })
            }, 2000)

        } else {
            setIncorrectAnswer(prev => prev + 1)
            ulRef.current?.classList.add(styles.unclickable)
            liElementRefs.current[ind]?.classList.add(styles['incorrect-answer'])
            playSuccessSound(false)

            timerCorrected.current = setTimeout(() => {
                handleStart({ endNumber, choiceOperation, setFirstNumb, setLastNumb, setResultNumb, setListNumb })
                setCount(prev => (prev !== null) ? prev - 1 : prev)
                ulRef.current?.classList.remove(styles.unclickable)
                liElementRefs.current.forEach((el) => {
                    el?.classList.remove(styles['incorrect-answer'])
                    el?.classList.remove(styles['correct-answer'])
                })
            }, 2000)
        }
    };

    useEffect(() => {
        if ((correctAnswer + incorrectAnswer) >= 20) {
            if (timerCorrected.current) {
                clearTimeout(timerCorrected.current)
            }

            setWinGame(true)
            handleStopGame()
            if(correctAnswer >= 20)  playWinSound()
          
            if (correctAnswer >= 20) {
                setTimeout(() => {
                    setWinGame(false)

                    if (winAudioRef.current) {
                        winAudioRef.current.pause();
                        winAudioRef.current.currentTime = 0;
                    }
                }, 25000)
            } else {
                setTimeout(() => {
                    setWinGame(false)
                }, 10000)
            }
        }
    }, [correctAnswer, incorrectAnswer])

    return (
        <div className={`${styles.container}  ${(winGame && correctAnswer === 20) ? styles['fone-success-best'] : (winGame ? styles['fone-success'] : styles['fone-default'])}`}>
            <h2>Тренажер з арифметики</h2>
            <div className={`${styles['settings-container']} ${winGame ? styles['hide-block'] : ''}`}>
                <div className={styles['block-choice-operation']}>
                    <span>Оберіть дію:</span>
                    <select
                        name="choiceOperation"
                        onChange={(e) => setChoiceOperation(e.target.value)}
                        ref={refOctionSetting}
                    >
                        <option value="+">+</option>
                        <option value="-">-</option>
                        <option value="/">/</option>
                        <option value="*">*</option>
                    </select>
                </div>
                <div className={styles['block-range']}>
                    <span>Діапазон від 1 до:</span>
                    <label htmlFor="range-choice">
                        <select
                            name="range"
                            id="range-choice"
                            onChange={(e) => handleChangeRange(Number(e.target.value))}
                            ref={refRangSetting}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                            <option value="60">60</option>
                            <option value="70">70</option>
                            <option value="80">80</option>
                            <option value="90">90</option>
                            <option value="100">100</option>
                        </select>
                    </label>
                </div>
            </div>
            <div className={`${styles['container-operation']}  ${winGame ? styles['hide-block'] : ''}`}>
                <div className={styles['block-operation']}>
                    <div className={styles['one-operand']}>
                        <input type="text" name="oneOperand" id="one-operand" ref={oneOperand} value={firstNumb} readOnly />
                    </div>
                    <span className={styles.sing}>{choiceOperation}</span>
                    <div className={styles['two-operand']}>
                        <input type="text" name="oneOperand" id="two-operand" ref={twoOperand} value={lastNumb} readOnly />
                    </div>
                    <span className={styles.sing}>=</span>
                    <div className={styles.sum}>
                        <span className={styles.empty}>
                            {answerOk ? resultNumb : '?'}</span>
                    </div>
                </div>
                <ul
                    className={styles['list-numbers']}
                    ref={ulRef}
                >
                    {listNumb?.map((elem, ind) =>
                        <li
                            key={ind}
                            onClick={(e) => handleChoiceAnswer((e.target as HTMLLIElement).textContent, ind)}
                            ref={(el: HTMLLIElement | null): void => {
                                liElementRefs.current[ind] = el;
                            }}
                        >
                            <span>{elem}</span>
                        </li>
                    )}
                </ul>
            </div>
            <div className={`${styles['block-table-answer']}   ${winGame ? styles['hide-block'] : ''}`}>
                <div><span>{correctAnswer}</span></div>
                <div><span>{incorrectAnswer}</span></div>
                <span>{count}</span>
            </div>
            <div className={`${styles['block-button']}  ${winGame ? styles['hide-block'] : ''}`}>
                <ButtonGames link="/tasks">До завдань</ButtonGames>
                <ButtonGames onClick={handleStartGame} ref={buttonStartRef}>Старт</ButtonGames>
                <ButtonGames onClick={handleStopGame}>Завершити</ButtonGames>
            </div>
        </div>
    )
};

export default Arithmetic;