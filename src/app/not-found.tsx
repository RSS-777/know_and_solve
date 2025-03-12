import { Header } from '../components/Header';
import styles from '../styles/pages/notFound.module.scss';

const NotFound = () => {
    return (
        <div className={styles['not-found-container']}>
            <Header title='404' />
            <p className={styles['not-found-text']}>Сторінка не знайдена. <br />
                Можливо, ця сторінка була переміщена або більше не існує.
            </p>
        </div>
    )
};

export default NotFound;