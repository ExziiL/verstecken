import { getDatabase, ref, set, update } from 'firebase/database';
import { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';
import { PlayerContext } from '../../contexts/PlayerContext';

const StartGame = () => {
	const { seconds, gameRunning, setGameRunning } = useContext(GameContext);
	const { players } = useContext(PlayerContext);

	const database = getDatabase();
	const gameRef = ref(database, 'game/');

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
		</div>
	);
};

export default StartGame;
