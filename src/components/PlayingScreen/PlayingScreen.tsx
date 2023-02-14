import { getDatabase, ref, update } from 'firebase/database';
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
	const database = getDatabase();
	const seekingPlayers = players.filter((player) => player.isSearching);
	const currentPlayer = players?.find((player) => player.id === currentUser?.uid);

	console.log('seekingPlayers', seekingPlayers);

	const handleBlackout = () => {
		if (currentPlayer.isSearching) {
			return <BlackoutScreen />;
		} else {
			return (
				<>
					<div className="text-xl text-center pb-4">
						Verstecke dich! Du hast noch <span className="font-bold">{60 - seconds}</span> Sekunden Zeit.
					</div>
					<Map />
				</>
			);
		}
	};

	const handleVisibleScreen = () => {
		return <Map />;
	};

	return (
		<div>
			<Navbar />
			{gameRunning && seconds < 60 && seekingPlayers ? handleBlackout() : handleVisibleScreen()}
			{/* <Map /> */}
			<StartGame />
			<CurrentUserInfo />
		</div>
	);
};

export default PlayingScreen;
