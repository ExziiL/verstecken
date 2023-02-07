import { off, onChildAdded, onDisconnect, onValue, ref, remove, set, update } from 'firebase/database';
import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { PlayerContext, PlayerProvider } from '../../contexts/PlayerContext';
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
	}, [ownLocation]);

	// --------------------------------------------- Player Handling ---------------------------------------------
	let { players, setPlayers } = useContext(PlayerContext);
	const { currentUser } = useAuth();

	let playerId: string;
	let playerRef: any; // allows us to access and interact with the player's data in the database
	let allPlayersRef = ref(database, 'players/');

	const playerColors = ['blue', 'green', 'yellow', 'purple', 'orange', 'black', 'white'];

	function randomFromArray(array: any[]) {
		return array[Math.floor(Math.random() * array.length)];
	}

	useEffect(() => {
		const onValueHandler = (snapshot: any) => {
			if (snapshot.val()) {
				setPlayers(Object.values(snapshot.val()));
			}
		};

		onValue(allPlayersRef, onValueHandler);

		return () => {
			off(allPlayersRef);
		};
	}, []);

	const handleDisconnect = (ref: any) => {
		const disconnect = onDisconnect(ref);
		disconnect.remove();
	};

	function setPlayerColor(playerId: string) {
		let playerRef = ref(database, 'players/' + playerId);

		// laufe über alle Spieler und setze die Farbe auf false
		console.log('playerHandler players', players);

		update(playerRef, {
			color: 'white',
			colorIsSet: true,
		}).then(() => {
			players.forEach((player) => {
				console.log('player', player.color);
			});
		});
	}

	function updatePlayerLocation(playerId: string, latLongCoordinates: [number, number]) {
		let playerRef = ref(database, 'players/' + playerId);

		update(playerRef, {
			latLongCoordinates: latLongCoordinates,
		}).then(() => {
			console.log('location set to ' + latLongCoordinates);
		});
	}

	// --------------------------------------------- Sync Player Data within Database ---------------------------------------------

	useEffect(() => {
		if (currentUser) {
			playerId = currentUser.uid;
			playerRef = ref(database, 'players/' + playerId);

			// set replaces the data at the specified location
			set(playerRef, {
				id: playerId,
				name: currentUser.email,
				isSearching: false,
				// color: setPlayerColor(playerId, randomFromArray(playerColors)),
				// color: randomFromArray(playerColors),
				latLongCoordinates: ownLocation,
				colorIsSet: false,
			});

			// ! Hier war ich! die Farbe wird nicht gesetzt?
			setPlayerColor(playerId);

			handleDisconnect(playerRef);
		}
		// ! welches von den beiden da unten ist richtig?
		// }, [ownLocation]);
	}, []);

	// if (players.length > 0) {
	// 	console.log('players', players);
	// }

	return (
		<React.Fragment key={currentUser?.uid}>
			<PlayerProvider>
				{players.map((player) => (
					<UserCircle
						color={player.color}
						playerName={player.name}
						isSearching={player.isSearching}
						latLongCoordinates={player.latLongCoordinates}
						key={player.id}
					/>
				))}
			</PlayerProvider>
		</React.Fragment>
	);
};

export default PlayerContainer;
