import styles from '../styles/components/gameCard.module.scss';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

interface IParametrs {
    h5: string,
    image: StaticImageData,
    link: string
};

export const GameCard = ({ h5, image, link }: IParametrs) => {
    return (
        <div className={styles.block}>
            <h5>{h5}</h5>
            <Image src={image} alt="Image" width={120} height={120} />
            <Link href={link}>Грати</Link>
        </div>
    )
};



