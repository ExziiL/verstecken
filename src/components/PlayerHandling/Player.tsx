import { useContext, useEffect, useState } from 'react';

import { getDatabase, off, onValue, ref, set, update } from 'firebase/database';
import { useAuth } from '../../contexts/AuthContext';
import { PlayerContext, PlayerProvider } from '../../contexts/PlayerContext';
import UserCircle from './UserCircle';

const Player = () => {
	const [playerLocation, setPlayerLocation] = useState<[number, number]>([0, 0]);
	const database = getDatabase();
	const { currentUser } = useAuth();
	const [watchId, setWatchId] = useState<any>();

	/* ---------------------------------------- Player Handling ---------------------------------------- */
	let { players, setPlayers } = useContext(PlayerContext);
	const playerRef = ref(database, 'players/' + currentUser?.uid);
	const allPlayersRef = ref(database, 'players/');

	const playerColors = ['blue', 'green', 'pink', 'yellow', 'purple', 'orange', 'black'];

	/* ----------------------------------- add player to database and set color --------------------------------------- */
	function setPlayerColor() {
		// search other players for colors already in use,
		// if color is already in use, remove it from the array
		players.forEach((player) => {
			if (playerColors.includes(player.color)) {
				playerColors.shift();
			}
		});

		// if color is not in use, set it to the player
		players.find(() => {
			update(playerRef, {
				color: playerColors[0],
				colorIsSet: true,
			});
		});
	}

	useEffect(() => {
		if (currentUser) {
			const playerRef = ref(database, 'players/' + currentUser.uid);

			onValue(playerRef, (snapshot) => {
				if (!snapshot.exists()) {
					set(playerRef, {
						id: currentUser.uid,
						name: currentUser.email,
						isSearching: false,
						color: 'grey',
						latLongCoordinates: playerLocation,
						colorIsSet: false,
					});
				}
			});
		}
	}, [currentUser]);

	useEffect(() => {
		const currentPlayer = players.find((player) => player.id === currentUser?.uid);

		if (!currentPlayer?.colorIsSet) {
			setPlayerColor();
		}
	}, [players, currentUser]);

	/* ----------------------------------- update player location ---------------------------------------- */
	// function updatePlayerLocation() {
	// 	update(playerRef, {
	// 		latLongCoordinates: playerLocation,
	// 	}).then(() => {
	// 		console.log('location updated: ', playerLocation);
	// 	});
	// }

	useEffect(() => {
		const id: any = navigator.geolocation.watchPosition(
			(position: any) => {
				console.log('location before: ', playerLocation);
				setPlayerLocation([position.coords.latitude, position.coords.longitude]);
				console.log('location after: ', playerLocation);

				update(playerRef, {
					latLongCoordinates: playerLocation,
				}).then(() => {
					console.log('location updated: ', playerLocation);
				});
			},
			(error) => {
				//TODO bessere Errorausgabe in den Geoinf-Unterlagen
				console.error(error);
			}
		);

		setWatchId(id);

		return () => {
			navigator.geolocation.clearWatch(watchId);
		};
	}, [playerLocation, currentUser]);

	return (
		<PlayerProvider>
			<div>
				{players.map((player) => (
					<UserCircle
						color={player.color}
						playerName={player.name}
						isSearching={player.isSearching}
						latLongCoordinates={player.latLongCoordinates}
						key={player.id}
					/>
				))}
			</div>
		</PlayerProvider>
	);
};

export default Player;
