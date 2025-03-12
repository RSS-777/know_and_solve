"use client";

import Link from "next/link";
import styles from '../styles/components/navigation.module.scss';
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname()

  return (
    <nav className={styles.navigation}>
      <Link href='/' className={pathname === "/"  ? styles.active : ''}>Головна</Link>
      <Link href='/tasks' className={pathname === "/tasks"  ? styles.active : ''}>Завдання</Link>
      <Link href='/contact' className={pathname === "/contact"  ? styles.active : ''}>Контакти</Link>
    </nav>
  )
};