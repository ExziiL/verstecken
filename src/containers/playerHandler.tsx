import { onChildAdded, onDisconnect, onValue, ref, remove, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { database } from '../firebase';

const PlayerContainer = () => {
	const [player, setPlayer] = useState<any[]>([]);
	const { currentUser } = useAuth();

	let playerId;
	let playerRef;
	let allPlayersRef = ref(database, 'players/');

	// ! Video bei 20:20

	onValue(allPlayersRef, (snapshot) => {
		// fires whenever a change occurs
	});

	onChildAdded(allPlayersRef, (snapshot) => {
		// fires when a new player is added
		const addedPlayer = snapshot.val();
	});

	const playerColors = ['blue', 'green', 'yellow', 'red', 'purple', 'orange', 'black', 'white'];

	function randomFromArray(array: any[]) {
		return array[Math.floor(Math.random() * array.length)];
	}

	const handleDisconnect = (ref: any) => {
		const disconnect = onDisconnect(ref);
		disconnect.remove();
	};

	useEffect(() => {
		if (currentUser) {
			playerId = currentUser.uid;
			playerRef = ref(database, 'players/' + playerId);

			set(playerRef, {
				id: playerId,
				name: currentUser.email,
				isSearching: true,
				color: randomFromArray(playerColors),
			});

			handleDisconnect(playerRef);
		}
	}, []);
};

export default PlayerContainer;
