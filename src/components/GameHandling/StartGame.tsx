import { getDatabase, ref, set, update } from 'firebase/database';
import { useContext } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { GameContext } from '../../contexts/GameContext';
import { PlayerContext } from '../../contexts/PlayerContext';

const StartGame = () => {
	const { seconds, gameRunning, setGameRunning } = useContext(GameContext);
	const { players } = useContext(PlayerContext);
	const { currentUser } = useAuth();

	const database = getDatabase();
	const gameRef = ref(database, 'game/');
	const playerRef = ref(database, 'players/' + currentUser?.uid);

	const handleStart = () => {
		if (players) {
			const seekingPlayers = players.filter((player) => player.isSearching);
			if (seekingPlayers.length === 0) {
				alert('No seeking players!');
			} else {
				setGameRunning(true);
				update(gameRef, { gameRunning: true });
			}
		}
	};

	function handleStop() {
		setGameRunning(false);
		update(gameRef, { gameRunning: false });
	}

	function handleReset() {
		const dbRef = ref(database, 'game/seconds');
		set(dbRef, 0);
	}

	function handleNewPlayingField() {
		// get current players position
		const currentPlayer = players?.find((player) => player.id === currentUser?.uid);

		if (currentPlayer) {
			const { latLongCoordinates } = currentPlayer;

			console.log('latLongCoordinates', latLongCoordinates);

			if (latLongCoordinates[0] !== 0 && latLongCoordinates[1] !== 0) {
				update(gameRef, { boundingBoxCenter: latLongCoordinates });
			} else {
				alert('Please wait until your position is loaded!');
			}
		}
	}

	// function getPlayerLocation() {
	// 	if (navigator.geolocation) {
	// 		console.log('button clicked');

	// 		navigator.geolocation.getCurrentPosition((position) => {
	// 			console.log('position', position);

	// 			const lat = position.coords.latitude;
	// 			const long = position.coords.longitude;
	// 			const latLongCoordinates = [lat, long];

	// 			const currentPlayer = players?.find((player) => player.id === currentUser?.uid);
	// 			console.log('latLongCoordinates', latLongCoordinates);
	// 			update(playerRef, { latLongCoordinates: latLongCoordinates });
	// 		});
	// 	} else {
	// 		alert('Geolocation is not supported by your browser.');
	// 	}
	// }

	const borderStyle = 'border-2 border-black px-6 py-1';

	return (
		<div>
			{seconds}
			<button
				className={`${borderStyle}`}
				onClick={gameRunning ? handleStop : handleStart}
			>
				{gameRunning ? 'Stop' : 'Start'}
			</button>
			<button
				className={`${borderStyle}`}
				onClick={handleReset}
			>
				Reset
			</button>
			<button
				className={`${borderStyle}`}
				onClick={handleNewPlayingField}
			>
				set playing field
			</button>
			{/* <button
				className={`${borderStyle}`}
				onClick={getPlayerLocation}
			>
				set location manually
			</button> */}
		</div>
	);
};

export default StartGame;
