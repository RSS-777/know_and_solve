import {Header} from '../../components/Header';
import { GameCard } from '../../components/GameCard';
import imageArithmetic from '../../assets/images/arithmetic/cloud.png'

const Task = () => {
    return(
        <div>
          <Header title="Виберіть завдання:" />
          <GameCard h5="Arithmetic" image={imageArithmetic} link="/games/arithmetic-trainer" />
        </div>
    )
};

export default Task;