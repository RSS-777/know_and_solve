import {Navigation} from './Navigation';
import styles from '../styles/components/header.module.scss';

interface IParams {
  title: string
};

export const Header = ({title}: IParams) => {
    return(
        <header className={styles.header}>
            <Navigation />
            <h1>{title}</h1>
        </header>
    )
};