import { Header } from '../../components/Header';
import { GameCard } from '../../components/GameCard';
import type { Metadata } from "next";
import styles from '../../styles/pages/tasks.module.scss';
import imageArithmetic from '../../assets/images/arithmetic/cloud.png';

export const metadata: Metadata = {
  title: "Завдання для школярів – Логічні, математичні та творчі задачі",
  description: "Різноманітні навчальні завдання для розвитку логіки, математичних навичок і творчого мислення у школярів. Вирішуй задачі та розвивайся!",
  keywords: "Математичні задачі, Логічні завдання, Творче мислення, Розвиток школярів, Завдання для дітей, Навчання, Освітні ігри, Головоломки"
};

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