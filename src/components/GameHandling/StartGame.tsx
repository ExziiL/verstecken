import { getDatabase, off, onValue, ref, set, update } from 'firebase/database';
import { LatLngTuple } from 'leaflet';
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

	// Handhabung des Start-Buttons
	const handleStart = () => {
		if (players) {
			const seekingPlayers = players.filter((player) => player.isSearching);
			const hidingPlayers = players.filter((player) => !player.isSearching);
			if (seekingPlayers.length === 0) {
				alert('No seeking players!');
			} else if (hidingPlayers.length === 0) {
				alert('No hiding players!');
			} else {
				setGameRunning(true);
				// update ist eine Funktion von firebase, sie aktualisiert den übergebenen Wert auf der Datenbank
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
		const currentPlayer = players?.find((player) => player.id === currentUser?.uid);

		if (currentPlayer) {
			// if currentPlayer exists, get current player position and write it to the database
			const { latLongCoordinates } = currentPlayer;

			console.log('latLongCoordinates', latLongCoordinates);

			if (latLongCoordinates[0] !== 0 && latLongCoordinates[1] !== 0) {
				update(gameRef, { boundingBoxCenter: latLongCoordinates });
			} else {
				alert('Please wait until your position is loaded!');
			}
		}
	}

	// useEffect wird bei jedem Render ausgeführt
	useEffect(() => {
		// onValue holt sich den Wert aus der Datenbank und speichert ihn in snapshot. Wenn sich der Wert ändert, wird onValue erneut ausgeführt.
		// onValue ist ebenfalls eine Funktion von firebase
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
			<div className="p-4 space-x-2">
				<button
					className={`${borderStyle}`}
					onClick={gameRunning ? handleStop : handleStart}
				>
					{gameRunning ? 'Stop Timer' : 'Start Timer'}
				</button>

				{!gameRunning && (
					<button
						className={`${borderStyle}`}
						onClick={handleReset}
					>
						Reset Timer
					</button>
				)}
			</div>

			{!gameRunning && (
				<>
					<div className="px-4">
						<button
							className={`${borderStyle}`}
							onClick={handleNewPlayingField}
						>
							set playing field to your position
						</button>
					</div>
					<div className="p-4 space-x-2">
						<button
							className={`${borderStyle}`}
							onClick={movePlayingFieldToRight}
						>
							move field right
						</button>
						<button
							className={`${borderStyle}`}
							onClick={movePlayingFieldToLeft}
						>
							move field left
						</button>
						<button
							className={`${borderStyle}`}
							onClick={movePlayingFieldUp}
						>
							move field up
						</button>
						<button
							className={`${borderStyle}`}
							onClick={movePlayingFieldDown}
						>
							move field down
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default StartGame;
