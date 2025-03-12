import styles from "../styles/pages/home.module.scss";
import type { Metadata } from "next";
import { Header } from '../components/Header';

export const metadata: Metadata = {
  title: "Завдання",
  description: "Завдання для школярів.",
  keywords: "Завдання, вправи"
};

export default function Home() {
  return (
    <div>
      <Header title='Домашня сторінка' />
      <main className={styles.main}>
        <p>Lorem ipsum dolor sit amet consectnda. Similique cumque ex odio maiores quibusdam eveniet. Mollitia veniam repudiandae ducimus.</p>
      </main>
    </div>
  );
}
