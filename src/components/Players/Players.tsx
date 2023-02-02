import { useContext } from 'react';
import playerHandler from './playerHandler';

const Players = () => {
	return <div>{playerHandler()}</div>;
};

export default Players;
