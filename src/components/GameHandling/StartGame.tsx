import { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';

const StartGame = () => {
	const { seconds } = useContext(GameContext);

	return <div>{seconds}</div>;
};

export default StartGame;
