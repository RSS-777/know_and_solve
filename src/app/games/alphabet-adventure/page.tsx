"use client";

import { useState, useEffect } from 'react';
import { ButtonGames } from '../../../components/ButtonGames';
import styles from '../../../styles/games/alphabet-adventure.module.scss';

const letters = [
    'Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh', 'Ii', 'Jj', 'Kk', 'Ll',
    'Mm', 'Nn', 'Oo', 'Pp', 'Qq', 'Rr', 'Ss', 'Tt', 'Uu', 'Vv', 'Ww', 'Xx',
    'Yy', 'Zz'
];

const playLetters = (letter: string) => {
    const soundPath = `/sound/alphabet-adventure/letters/letter-${letter[0]}.mp3`
    const audio = new Audio(soundPath);
    audio.play();
};

const AlphabetAdventure = () => {
    const [visibleLetters, setVisibleLetters] = useState<string[]>([])
    const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

    useEffect(() => {
        if (!soundEnabled) return;

        letters.forEach((el, index) => {
            setTimeout(() => {
                playLetters(el)
                setVisibleLetters(prev => [...prev, el])
            }, index * 3000)
        })
    }, [soundEnabled])

    const handleLetterClick = (letter: string) => {
        playLetters(letter)
    };

    const handleStartGame = () => {
        setSoundEnabled(true)
    };

    return (
        <div className={styles.wrapper}>
            <h2>Алфавітна пригода</h2>
            <div className={styles['container-games']}>
                <ul className={styles['list-letters']}>
                    {visibleLetters.map((el) => (
                        <li
                            key={el}
                            onClick={() => handleLetterClick(el)}
                        >
                            {el}
                        </li>
                    ))}
                </ul>
                <div>
                    <ButtonGames link="/tasks">До завдань</ButtonGames>
                    <ButtonGames onClick={handleStartGame}>Старт</ButtonGames>
                    {/* <ButtonGames onClick={handleStopGame}>Завершити</ButtonGames> */}
                </div>
            </div>
        </div>
    );
};

export default AlphabetAdventure;

