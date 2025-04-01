"use client"
import { memo, useState, useEffect, useCallback } from 'react';
import styles from '../styles/components/letterSoundQuestion.module.scss';
import { generateRandomLetter, checkAnswer, speechToText } from '../app/games/alphabet-adventure/gameLogic';

export const LetterSoundQuestion = memo(() => {
  const [letter, setLetter] = useState<string>('')
  const [isListening, setIsListening] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');
  const [disabledButton, setDisabledButton] = useState<boolean>(false)
  const [correctedAnswer, setCorrectedAnswer] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const genereteLetter = useCallback(() => {
    const letterRandom = generateRandomLetter()
    if (letterRandom) setLetter(letterRandom)
  }, [])

  useEffect(() => {
    setLetter(generateRandomLetter())
  }, [])

  const handleStart = () => {
    if (isListening) return;
    setIsListening(true)
    
    speechToText({
      setIsListening,
      setMessage,
      setAnswer,
      checkAnswer,
      letter,
      genereteLetter,
      setCorrectedAnswer,
      setDisabledButton,
    });
  }

  return (
    <div className={styles.container}>
      <h3>Давай перевіримо, чи знаєш ти слова, що починаються з цих букв.</h3>
      <p>Назвіть слово на букву: <span>{letter}</span></p>
      <button
        onClick={handleStart}
        disabled={disabledButton}
        className={(correctedAnswer && answer) ? styles['correctedAnswer'] : answer ? styles['notCorrectedAnswer'] : (isListening) ? styles.isListening : ''}
      >{isListening ? 'Cлухаю' : (answer) ? '' : 'Відповісти'}</button>
      {message && (
        <p className={styles.message}>
          {answer ? (
            <>
              Відповідь: <i>{answer}</i> {message}
            </>
          ) : (
            message
          )}
        </p>
      )}
    </div>
  )
});

LetterSoundQuestion.displayName = "LetterSoundQuestion";