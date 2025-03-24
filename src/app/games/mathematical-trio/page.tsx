'use client'

import styles from '../../../styles/games/mathematical.module.scss';
import { useEffect, useState, useRef } from 'react';
import { ButtonGames } from '../../../components/ButtonGames';
import { clearValues, handleStartGame, handleStopGame, handleAnswer } from './gameLogic';

const Mathematical = () => {
    const [oneNumber, setOneNumber] = useState<number>(0)
    const [twoNumber, setTwoNumber] = useState<number>(0)
    const [threeNumber, setThreeNumber] = useState<number>(0)
    const [oneSign, setOneSign] = useState<string>('+')
    const [twoSign, setTwoSign] = useState<string>('+')
    const [result, setResult] = useState<number | null>(null)
    const [error, setError] = useState<string>('')
    const [answer, setAnswer] = useState<number | null>(null)
    const [correctAnswer, setCorrectAnswer] = useState<number>(0)
    const [incorrectAnswer, setIncorrectAnswer] = useState<number>(0)
    const [numberQuestions, setNumberQuestions] = useState<number>(0)
    const [gameEnd, setGameEnd] = useState<boolean>(false)

    const [range, setRange] = useState<number>(5)
    const [selectedOperator, setSelectedOperator] = useState<string[]>([])

    const resultRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const blockInfoGamesRef = useRef<HTMLDivElement | null>(null)
    const containerGamesRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (gameEnd) {
            blockInfoGamesRef.current?.classList.add(styles['show-information-block'])
            containerGamesRef.current?.classList.add(styles['hidden-element'])

            setTimeout(() => {
                setGameEnd(false)
                setNumberQuestions(0)
                setIncorrectAnswer(0)
                setCorrectAnswer(0)
                clearValues({ setOneNumber, setTwoNumber, setThreeNumber, setResult, setAnswer, inputRef })
                buttonRef.current?.classList.remove(styles['not-active'])
                blockInfoGamesRef.current?.classList.remove(styles['show-information-block'])
                containerGamesRef.current?.classList.remove(styles['hidden-element'])
            }, 5000)
        }
    }, [gameEnd])

    // handleStartGame({selectedOperator, buttonRef, setNumberQuestions,setOneNumber, setTwoNumber, setThreeNumber, setOneSign, setTwoSign, setResult, setError, range, styles })

    // handleStopGame({buttonRef, blockInfoGamesRef, containerGamesRef, setGameEnd, setNumberQuestions, setIncorrectAnswer, setCorrectAnswer, setGameEnd, styles}) 

    // handleAnswer({setAnswer, setCorrectAnswer, setIncorrectAnswer,, setGameEnd,  inputRef,  resultRef, numberQuestions, answer, result})

    const handleSignOperation = (value: string) => {
        setSelectedOperator(prev => {
            const newOperators = [...prev];
            const index = prev.indexOf(value)

            if (index !== -1) {
                newOperators.splice(index, 1)
            } else {
                newOperators.push(value)
            }

            return newOperators
        })
    }

    const handleChoiceRange = (numb: number) => {
        setRange(numb)
    }

    return (
        <div className={styles.container}>
            <h2>Математичне тріо</h2>
            <div className={styles['block-info-games']} ref={blockInfoGamesRef}>
                <p>Ваш результат:</p>
                <ul>
                    <li>Кількість запитань: <span>{numberQuestions}</span></li>
                    <li>Правильні відповіді: <span>{correctAnswer}</span></li>
                    <li>Неправильні відповіді: <span>{incorrectAnswer}</span></li>
                </ul>
            </div>
            <div className={styles['container-flex']} ref={containerGamesRef}>
                <div className={`${styles['block-settings']} ${numberQuestions > 0 ? styles['non-interactive'] : ''}`}>
                    <div className={styles['settings-sign-operation']}>
                        <p>Вибір математичних знаків:</p>
                        <div>
                            <div>
                                <label htmlFor="plus-checkbox">Додавання:</label>
                                <input type="checkbox" name="+" id="plus-checkbox" onChange={(e) => handleSignOperation(e.target.name)} />
                            </div>
                            <div>
                                <label htmlFor="minus-checkbox">Віднімання:</label>
                                <input type="checkbox" name="-" id="minus-checkbox" onChange={(e) => handleSignOperation(e.target.name)} />
                            </div>
                            <div>
                                <label htmlFor="multiply-checkbox">Множення:</label>
                                <input type="checkbox" name="*" id="multiply-checkbox" onChange={(e) => handleSignOperation(e.target.name)} />
                            </div>
                            <div>
                                <label htmlFor="divide-checkbox">Ділення:</label>
                                <input type="checkbox" name="/" id="divide-checkbox" onChange={(e) => handleSignOperation(e.target.name)} />
                            </div>
                        </div>
                    </div>
                    <div className={styles['settings-choise-range']}>
                        <label htmlFor="choice-range">Максимальне число:</label>
                        <select
                            name="range"
                            id="choice-range"
                            onChange={(e) => handleChoiceRange(Number(e.target.value))}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                            <option value="35">35</option>
                            <option value="40">40</option>
                            <option value="45">45</option>
                            <option value="50">50</option>
                            <option value="55">55</option>
                            <option value="60">60</option>
                            <option value="65">65</option>
                            <option value="70">70</option>
                            <option value="75">75</option>
                            <option value="80">80</option>
                            <option value="85">85</option>
                            <option value="90">90</option>
                            <option value="95">95</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </div>
                <div className={styles['container-blocks-game-mechanics']}>
                    <p className={styles['count-questions']}>Кількість запитань: <span>{numberQuestions}</span></p>
                    <div>
                        <div className={styles['block-game-mechanics']}>
                            <div className={`${styles['one-number']} ${styles['number']}`}>{oneNumber}</div>
                            <div className={`${styles['one-sign']} ${styles['sign']}`}>{oneSign}</div>
                            <div className={`${styles['two-number']} ${styles['number']}`}>{twoNumber}</div>
                            <div className={`${styles['two-sign']} ${styles['sign']}`}>{twoSign}</div>
                            <div className={`${styles['three-number']} ${styles['number']}`}>{threeNumber}</div>
                            <div className={`${styles['equals']} ${styles['sign']}`}>=</div>
                            <div className={`${styles.result} ${styles['number']}`} ref={resultRef}>
                                <input
                                    type="number"
                                    name="answer"
                                    id="answer"
                                    disabled={numberQuestions === 0}
                                    onChange={(e) => setAnswer(Number(e.target.value))}
                                    ref={inputRef}
                                />
                            </div>
                        </div>
                        <ButtonGames
                        // {selectedOperator, buttonRef, setNumberQuestions,setOneNumber, setTwoNumber, setThreeNumber, setOneSign, setTwoSign, setResult, setError, range }
                            onClick={() => handleAnswer({
                                setAnswer,
                                setCorrectAnswer,
                                setIncorrectAnswer,
                                setGameEnd,
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
                            })
                            }
                            disabled={numberQuestions === 0 || answer === null}
                        >
                            Перевірити результат
                        </ButtonGames>
                        <div className={styles['block-button']}>
                            <ButtonGames link="/tasks">До завдань</ButtonGames>
                            <ButtonGames
                                onClick={() => handleStartGame({
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
                                })}
                                ref={buttonRef}
                            >
                                Старт
                            </ButtonGames>
                            <ButtonGames
                                onClick={() => handleStopGame({
                                    buttonRef,
                                    blockInfoGamesRef,
                                    containerGamesRef,
                                    setGameEnd,
                                    setNumberQuestions,
                                    setIncorrectAnswer,
                                    setCorrectAnswer,
                                    styles
                                })}
                            >
                                Завершити
                            </ButtonGames>
                        </div>
                        <div className={styles['block-error']}>
                            <span>{error}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Mathematical;