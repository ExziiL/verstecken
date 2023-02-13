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
	const allPlayersRef = ref(database, 'players/');

	const playerColors = ['blue', 'green', 'pink', 'yellow', 'purple', 'orange', 'black'];

	/* ----------------------------------- add player to database and set color --------------------------------------- */
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
	}, [playerIdRef, currentUser]); // Hier ein argument hinzufügen? davor war es [currentUser]

	const handleDisconnect = (ref: any) => {
		const disconnect = onDisconnect(ref);
		disconnect.remove();
	};

	function setPlayerColor(givenPlayers: any) {
		const currentPlayer = givenPlayers.find((player: any) => player.id === currentUser?.uid);

		if (!currentPlayer?.colorIsSet) {
			const usedColors = givenPlayers.map((player: any) => player.color);
			const availableColors = playerColors.filter((color) => !usedColors.includes(color));

			if (availableColors.length > 0) {
				update(playerIdRef, {
					color: availableColors[0],
					colorIsSet: true,
				});
			}
		}
	}

	/* ----------------- get all player from database and write them to my players context --------------- */
	useEffect(() => {
		onValue(allPlayersRef, (snapshot) => {
			if (snapshot.val()) {
				setPlayers(Object.values(snapshot.val()));
				setPlayerColor(players);
			}
		});

		return () => {
			off(allPlayersRef);
		};
	}, [playerLocation, currentUser]);

	/* ----------------------------------- update player location ---------------------------------------- */
	useEffect(() => {
		const id: any = navigator.geolocation.watchPosition(
			(position: any) => {
				setPlayerLocation([position.coords.latitude, position.coords.longitude]);

				update(playerIdRef, {
					latLongCoordinates: playerLocation,
				}).then(() => {});
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
			{players.map((player) => (
				<div key={player.id}>
					<UserCircle
						color={player.color}
						playerName={player.name}
						isSearching={player.isSearching}
						latLongCoordinates={player.latLongCoordinates}
					/>
				</div>
			))}
		</PlayerProvider>
	);
};

export default Player;
