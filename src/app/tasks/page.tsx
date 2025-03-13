import { Header } from '../../components/Header';
import { GameCard } from '../../components/GameCard';
import styles from '../../styles/pages/tasks.module.scss';
import imageArithmetic from '../../assets/images/arithmetic/cloud.png';

const Task = () => {
  return (
    <div className={styles['tasks-container']}>
      <Header title="Виберіть завдання:" />
      <section className={styles['block-games']}>
        <GameCard h5="Arithmetic" image={imageArithmetic} link="/games/arithmetic-trainer" />
      </section>
    </div>
  )
};

export default Task;