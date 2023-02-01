import { off, onChildAdded, onDisconnect, onValue, ref, remove, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { database } from '../../firebase';

import UserCircle from './UserCircle';

const PlayerContainer = () => {
	// --------------------------------------------- Geolocation Handling ---------------------------------------------
	const [ownLocation, setOwnLocation] = useState<[number, number]>([0, 0]);
	const [watchId, setWatchId] = useState<any>();

	useEffect(() => {
		const id: any = navigator.geolocation.watchPosition(
			(position: any) => {
				setOwnLocation([position.coords.latitude, position.coords.longitude]);
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
	}, []);

	// --------------------------------------------- Player Handling ---------------------------------------------
	// const [player, setPlayer] = useState<any>({});
	const [players, setPlayers] = useState<any[]>([]);
	const { currentUser } = useAuth();

	let playerId: string;
	let playerRef: any; // allows us to access and interact with the player's data in the database
	let allPlayersRef = ref(database, 'players/');
	let playerElements: any = {};

	useEffect(() => {
		const onValueHandler = (snapshot: any) => {
			setPlayers(Object.values(snapshot.val()));
		};

		onValue(allPlayersRef, onValueHandler);

		return () => {
			off(allPlayersRef);
		};
	}, []);

	onChildAdded(allPlayersRef, (snapshot) => {
		// fires when a new player is added
		// const addedPlayer = snapshot.val();
		// if (addedPlayer.id === playerId) {
		// 	// I am the player
		// 	// alert('You are the player!');
		// }
		// playerElements[addedPlayer.id] = (
		// 	<UserCircle
		// 		color={addedPlayer.color}
		// 		playerName={addedPlayer.name}
		// 		isSearching={addedPlayer.isSearching}
		// 		latLongCoordinates={addedPlayer.latLongCoordinates}
		// 		key={addedPlayer.id}
		// 	/>
		// );
		// Set name here
		// set player position here
	});

	const playerColors = ['blue', 'green', 'yellow', 'red', 'purple', 'orange', 'black', 'white'];

	function randomFromArray(array: any[]) {
		return array[Math.floor(Math.random() * array.length)];
	}

	const handleDisconnect = (ref: any) => {
		const disconnect = onDisconnect(ref);
		disconnect.remove();
	};

	// Sync Player Data within Database
	useEffect(() => {
		if (currentUser) {
			playerId = currentUser.uid;
			playerRef = ref(database, 'players/' + playerId);

			set(playerRef, {
				id: playerId,
				name: currentUser.email,
				isSearching: false,
				color: randomFromArray(playerColors),
				latLongCoordinates: ownLocation,
			});

			handleDisconnect(playerRef);
		}
	}, [ownLocation]);

	if (players.length > 0) {
		console.log('players', players);
	}

	return (
		<>
			{players.map((player) => (
				<UserCircle
					color={player.color}
					playerName={player.name}
					isSearching={player.isSearching}
					latLongCoordinates={player.latLongCoordinates}
					key={player.id}
				/>
			))}
		</>
	);
};

export default PlayerContainer;
