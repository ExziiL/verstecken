import { useContext } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { GameContext } from '../../contexts/GameContext';
import { PlayerContext } from '../../contexts/PlayerContext';
import BlackoutScreen from '../GameHandling/BlackoutScreen';
import StartGame from '../GameHandling/StartGame';
import Navbar from '../globals/Navbar/Navbar';
import CurrentUserInfo from './CurrentUserInfo/CurrentUserInfo';
import Map from './Map/Map';

const PlayingScreen = () => {
	const { seconds, gameRunning } = useContext(GameContext);
	const { players } = useContext(PlayerContext);
	const { currentUser } = useAuth();
	const seekingPlayers = players.filter((player) => player.isSearching);
	const currentPlayer = players?.find((player) => player.id === currentUser?.uid);

	const handleBlackout = () => {
		if (currentPlayer.isSearching) {
			return <BlackoutScreen />;
		} else {
			return (
				<div className="text-xl text-center pb-4">
					Verstecke dich! Du hast noch <span className="font-bold">{60 - seconds}</span> Sekunden Zeit.
				</div>
			);
		}
	};

	return (
		<div>
			<Navbar />
			{gameRunning && seconds < 60 && seekingPlayers ? handleBlackout() : null}
			<Map hidden={gameRunning && seconds < 60 && currentPlayer.isSearching ? true : false} />
			<StartGame />
			<CurrentUserInfo />
		</div>
	);
};

export default PlayingScreen;
