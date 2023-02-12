import { useContext, useEffect, useState } from 'react';

import { getDatabase, off, onDisconnect, onValue, ref, set, update } from 'firebase/database';
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
	const playerIdRef = ref(database, 'players/' + currentUser?.uid);
	const playerLocationRef = ref(database, 'players/' + currentUser?.uid + '/latLongCoordinates');
	const allPlayersRef = ref(database, 'players/');

	const playerColors = ['blue', 'green', 'pink', 'yellow', 'purple', 'orange', 'black'];

	/* get all player from database and write them to my players context, set appropriate colors */
	useEffect(() => {
		console.log('playerLocationRef: ', playerLocationRef);
		onValue(allPlayersRef, (snapshot) => {
			if (snapshot.val()) {
				setPlayers(Object.values(snapshot.val()));
				setPlayerColor();
			}
		});

		return () => {
			off(allPlayersRef);
		};
	}, [playerLocation, currentUser]);

	/* ----------------------------------- add player to database --------------------------------------- */
	useEffect(() => {
		if (currentUser) {
			const playerRef = ref(database, 'players/' + currentUser.uid);

			onValue(playerRef, (snapshot) => {
				const objectLength = snapshot.val() ? Object.keys(snapshot.val()).length : 0;
				if (!snapshot.exists() || objectLength < 6) {
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

			handleDisconnect(playerRef);
		}
	}, [playerIdRef]); // Hier ein argument hinzufügen? davor war es [currentUser]

	const handleDisconnect = (ref: any) => {
		const disconnect = onDisconnect(ref);
		disconnect.remove();
	};

	/* ----------------------------------- determine player color ---------------------------------------- */
	function setPlayerColor() {
		const currentPlayer = players.find((player) => player.id === currentUser?.uid);

		if (!currentPlayer?.colorIsSet) {
			const usedColors = players.map((player) => player.color);
			const availableColors = playerColors.filter((color) => !usedColors.includes(color));

			if (availableColors.length > 0) {
				update(playerIdRef, {
					color: availableColors[0],
					colorIsSet: true,
				});
			}
		}
	}

	useEffect(() => {
		const currentPlayer = players.find((player) => player.id === currentUser?.uid);

		if (!currentPlayer?.colorIsSet) {
			setPlayerColor();
		}
	}, [players, currentUser, playerIdRef]);

	/* ----------------------------------- update player location ---------------------------------------- */
	useEffect(() => {
		const id: any = navigator.geolocation.watchPosition(
			(position: any) => {
				// console.log('location before: ', playerLocation);
				setPlayerLocation([position.coords.latitude, position.coords.longitude]);
				// console.log('location after: ', playerLocation);

				update(playerIdRef, {
					latLongCoordinates: playerLocation,
				}).then(() => {
					// console.log('location updated: ', playerLocation);
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

	// TODO: 1. Artikel zu React key durchlesen: https://beta.reactjs.org/learn/rendering-lists
	// TODO: 2. Key in UserCircle Component hinzufügen
	// TODO: 3. Farbe der UserCircle Component dynamisch setzen, funktioniert schon wieder nicht ._.
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
