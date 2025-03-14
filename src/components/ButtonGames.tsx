import Link from "next/link";
import { ReactNode, MouseEventHandler, ForwardedRef, forwardRef } from 'react';
import styles from '../styles/components/buttonGames.module.scss';

interface IProps {
    link?: string,
    children: ReactNode,
    onClick?: MouseEventHandler
};

export const ButtonGames = forwardRef<HTMLButtonElement, IProps>(
    ({ link, children, onClick }, ref: ForwardedRef<HTMLButtonElement>) => {
        return (
            <button
                type="button"
                onClick={onClick}
                className={styles.button}
                ref={ref}
            >
                {link ? <Link href={link}>{children}</Link> : <>{children}</>}
            </button>
        );
    }
);

ButtonGames.displayName = 'ButtonGames';