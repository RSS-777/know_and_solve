"use client";

import { useState, useEffect } from 'react';
import { ButtonGames } from '../../../components/ButtonGames';
import styles from '../../../styles/games/alphabet-adventure.module.scss';
import { letters } from '../../../data/letters';
import { playLetters } from './gameLogic';
import { LetterSoundQuestion } from '../../../components/LetterSoundQuestion';

const AlphabetAdventure = () => {
    const [visibleLetters, setVisibleLetters] = useState<string[]>([])
    const [soundEnabled, setSoundEnabled] = useState<boolean>(false)
    const [nextStage, setNextStage] = useState<boolean>(false)

    useEffect(() => {
       if(visibleLetters.length === 26) {
          setTimeout(() => {
             setNextStage(true)
          }, 3000)
       } else {
           setNextStage(false)
       }
    },[visibleLetters])

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
                {soundEnabled
                    ? (
                        <section>
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
                            {nextStage && <LetterSoundQuestion />}
                        </section>
                    ) : (
                        <section className={styles['container-information']}>
                            <h3>Як вивчити англійську мову:</h3>
                            <p>
                                Привіт, маленький досліднику! 🌟 Вивчати англійську мову – це весело і дуже цікаво. Коли ти знатимеш англійську, зможеш розуміти пісні, дивитися мультики без перекладу, грати в ігри англійською та навіть знайти друзів з інших країн!
                                <br />Ось кілька простих порад, які допоможуть тобі навчитися говорити, читати та розуміти англійську:
                            </p>
                            <ol>
                                <li>
                                    <h4>Вчи слова за допомогою картинок 🎨</h4><br />
                                    <div className={styles['li-content']}>
                                        Англійські слова легше запам’ятовувати, якщо ти бачиш картинки.
                                        Наприклад:
                                        <ul>
                                            <li>🐶 <span>Dog</span> – собачка</li>
                                            <li>🍏 <span>Apple</span> – яблуко</li>
                                            <li>🌞 <span>Sun</span> – сонечко</li>
                                        </ul>
                                        Можеш малювати або розглядати картки зі словами – так буде цікавіше!
                                    </div>
                                </li>
                                <li>
                                    <h4>Дивись мультики англійською 📺</h4><br />
                                    <div className={styles['li-content']}>
                                        Ти любиш мультики?
                                        <br /> А якщо дивитися їх англійською мовою?
                                        <br /> Можеш почати з простих і коротких мультфільмів, таких як <span>Peppa Pig або Dora the Explorer</span>.
                                    </div>
                                </li>
                                <li>
                                    <h4>Грай у мовні ігри 🎲</h4><br />
                                    <div className={styles['li-content']}>
                                        Грати – це весело і корисно! Є багато ігор для вивчення англійської:
                                        <ul>
                                            <li>Вгадай слово за картинкою.</li>
                                            <li>Знайди букви у словах.</li>
                                            <li>Перетягни слова на правильні малюнки.</li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <h4>Повторюй алфавіт 🔤</h4><br />
                                    <div className={styles['li-content']}>
                                        Вчи букви англійського алфавіту, співай пісеньку ABC Song і пробуй називати предмети, які починаються з кожної літери.
                                        <br />Наприклад:
                                        <ul>
                                            <li><span>A – Apple</span> (яблуко)</li>
                                            <li><span>B – Ball</span> (м’яч)</li>
                                            <li><span>C – Cat</span> (кіт)</li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <h4>Запам’ятовуй прості фрази 🗣</h4><br />
                                    <div className={styles['li-content']}>
                                        Починай із найпростіших фраз:
                                        <ul>
                                            <li><span>Hello!</span> – Привіт!</li>
                                            <li><span>Good morning!</span> – Доброго ранку!</li>
                                            <li><span>How are you?</span> – Як справи?</li>
                                            <li><span>I am fine, thank you!</span> – У мене все добре, дякую!</li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <h4>Вчися щодня по трохи ⏰</h4><br />
                                    <div className={styles['li-content']}>
                                        Щоб швидко навчитися англійської, займайся щодня хоча б 10–15 хвилин.
                                        <br /> Можна повторювати слова, співати пісні, дивитися мультики або грати в ігри.
                                    </div>
                                </li>
                            </ol>
                            <p>
                                <strong>Пам’ятай:</strong>
                                <br /><i>Англійська</i> – це як чарівні двері в великий світ! Вчися щодня, грайся, слухай пісеньки – і ти дуже швидко почнеш розуміти англійську. 🌍🧸
                            </p>
                        </section>
                    )
                }
            </div>
            <div className={styles['block-button']}>
                <ButtonGames link="/tasks">Повернутись</ButtonGames>
                <ButtonGames onClick={handleStartGame} disabled={nextStage || soundEnabled}>Почати гру</ButtonGames>
            </div>
        </div>
    );
};

export default AlphabetAdventure;

