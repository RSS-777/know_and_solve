'use client'

import styles from '../../../styles/games/mathematical.module.scss';
import { useState } from 'react';
import { ButtonGames } from '../../../components/ButtonGames';

const Mathematical = () => {
    const [oneNumber, setOneNumber] = useState<number | null>(5)
    const [twoNumber, setTwoNumber] = useState<number | null>(4)
    const [treeNumber, setTreeNumber] = useState<number | null>(7)
    const [oneSing, setOneSing] = useState<string | null>('-')
    const [twoSing, setTwoSing] = useState<string | null>('+')
    const [result, setResult] = useState<number | string>('?')

    const handleStartGame = () => {
        setOneNumber(5)
        setTwoNumber(4)
        setTreeNumber(7)
        setOneSing('+')
        setTwoSing('-')
        setResult(20)
    }


    const handleStopGame = () => {

    }

    return (
        <div className={styles.container}>
            <h2>Математичне тріо</h2>
            <div className={styles['container-flex']}>
                <div className={styles['block-settings']}></div>
                <div className={styles['block-game-mechanics']}>
                    <div className={`${styles['one-number']} ${styles['number']}`}>{oneNumber}</div>
                    <div className={`${styles['one-sign']} ${styles['sign']}`}>{oneSing}</div>
                    <div className={`${styles['two-number']} ${styles['number']}`}>{twoNumber}</div>
                    <div className={`${styles['two-sign']} ${styles['sign']}`}>{twoSing}</div>
                    <div className={`${styles['three-number']} ${styles['number']}`}>{treeNumber}</div>
                    <div className={`${styles['equals']} ${styles['sign']}`}>=</div>
                    <div className={`${styles.result} ${styles['number']}`}>{result}</div>
                </div>
                <div className={styles['block-button']}>
                    <ButtonGames link="/tasks">До завдань</ButtonGames>
                    <ButtonGames onClick={handleStartGame}>Старт</ButtonGames>
                    <ButtonGames onClick={handleStopGame}>Завершити</ButtonGames>
                </div>
            </div>
        </div>
    )
};

export default Mathematical;