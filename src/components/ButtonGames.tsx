import Link from "next/link";
import { ReactNode, MouseEventHandler, ForwardedRef, forwardRef } from 'react';
import styles from '../styles/components/buttonGames.module.scss';

interface IProps {
    link?: string,
    children: ReactNode,
    onClick?: MouseEventHandler,
    disabled?: boolean
};

export const ButtonGames = forwardRef<HTMLButtonElement, IProps>(
    ({ link, children, onClick, disabled }, ref: ForwardedRef<HTMLButtonElement>) => {
        return (
            <button
                type="button"
                onClick={onClick}
                className={styles.button}
                ref={ref}
                disabled={disabled}
            >
                {link ? <Link href={link}>{children}</Link> : <>{children}</>}
            </button>
        );
    }
);

ButtonGames.displayName = 'ButtonGames';