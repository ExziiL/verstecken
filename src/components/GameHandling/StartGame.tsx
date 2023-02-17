import { getDatabase, off, onValue, ref, set, update } from 'firebase/database';
import { useContext, useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { GameContext } from '../../contexts/GameContext';
import { PlayerContext } from '../../contexts/PlayerContext';

const StartGame = () => {
	const [boundingBoxCenter, setBoundingBoxCenter] = useState<any>([0, 0]);
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

	useEffect(() => {
		onValue(gameRef, (snapshot) => {
			if (snapshot.exists()) {
				const game = snapshot.val();
				setBoundingBoxCenter(game.boundingBoxCenter);
			}
		});
	}, []);

	function movePlayingFieldToLeft() {
		if (boundingBoxCenter) {
			const newBoundingBoxCenter = [boundingBoxCenter[0], boundingBoxCenter[1] - 0.0001];

			update(gameRef, { boundingBoxCenter: newBoundingBoxCenter });

			setBoundingBoxCenter(newBoundingBoxCenter);
		}
	}
	function movePlayingFieldUp() {
		if (boundingBoxCenter) {
			const newBoundingBoxCenter = [boundingBoxCenter[0] + 0.0001, boundingBoxCenter[1]];

			update(gameRef, { boundingBoxCenter: newBoundingBoxCenter });

			setBoundingBoxCenter(newBoundingBoxCenter);
		}
	}
	function movePlayingFieldDown() {
		if (boundingBoxCenter) {
			const newBoundingBoxCenter = [boundingBoxCenter[0] - 0.0001, boundingBoxCenter[1]];

			update(gameRef, { boundingBoxCenter: newBoundingBoxCenter });

			setBoundingBoxCenter(newBoundingBoxCenter);
		}
	}
	function movePlayingFieldToRight() {
		if (boundingBoxCenter) {
			const newBoundingBoxCenter = [boundingBoxCenter[0], boundingBoxCenter[1] + 0.0001];

			update(gameRef, { boundingBoxCenter: newBoundingBoxCenter });

			setBoundingBoxCenter(newBoundingBoxCenter);
		}
	}

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
			<button
				className={`${borderStyle}`}
				onClick={movePlayingFieldToRight}
			>
				move right
			</button>
			<button
				className={`${borderStyle}`}
				onClick={movePlayingFieldToLeft}
			>
				move left
			</button>
			<button
				className={`${borderStyle}`}
				onClick={movePlayingFieldUp}
			>
				move up
			</button>
			<button
				className={`${borderStyle}`}
				onClick={movePlayingFieldDown}
			>
				move down
			</button>
		</div>
	);
};

export default StartGame;
