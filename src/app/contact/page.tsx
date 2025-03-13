"use client"

import { Header } from '../../components/Header';
import { useForm, SubmitHandler } from "react-hook-form";
import styles from '../../styles/pages/contact.module.scss';

type TypeFormData = {
    firstName: string,
    lastName: string,
    letter: string
}
const Contact = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TypeFormData>();

    const onSubmit: SubmitHandler<TypeFormData> = (data) => {
        console.log(data)
    }

    return (
        <div className={styles['wrapper-contact']}>
            <Header title="Напишіть нам" />
            <div className={styles['container-form']}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles['block-input']}>
                        <label htmlFor="first-name">Ім'я:</label>
                        <input
                            id='first-name'
                            autoComplete="off"
                            {...register('firstName', {
                                required: 'Це поле є обов\'язковим.',
                                minLength: { value: 3, message: 'Ім\'я має бути мінімум 3 символи.' },
                                pattern: {
                                    value: /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ'ї]+$/i,
                                    message: 'Ім\'я може містити тільки букви.'
                                }
                            })}
                        />
                    </div>
                    <p className={styles.error}>{errors.firstName?.message}</p>
                    <div className={styles['block-input']}>
                        <label htmlFor="last-name">Прізвище:</label>
                        <input
                            id='last-name'
                            autoComplete="off"
                            {...register('lastName', {
                                required: 'Це поле є обов\'язковим.',
                                minLength: { value: 3, message: 'Прізвище має бути мінімум 3 символи.' },
                                pattern: {
                                    value: /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ'ї]+$/i,
                                    message: 'Прізвище може містити тільки букви.'
                                }
                            })}
                        />
                    </div>
                    <p className={styles.error}>{errors.lastName?.message}</p>
                    <div className={styles['block-letter']}>
                        <label htmlFor="letter">Повідомлення:</label>
                        <textarea
                            id='letter'
                            autoComplete="off"
                            {...register('letter', {
                                required: 'Це поле є обов\'язковим.',
                                minLength: { value: 10, message: 'Опишіть проблему або пропозицію детальніше.' }
                            })}
                        />
                    </div>
                    <p className={styles.error}>{errors.letter?.message}</p>
                    <div className={styles['block-button']}>
                        <button type="submit">Відправити</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Contact;