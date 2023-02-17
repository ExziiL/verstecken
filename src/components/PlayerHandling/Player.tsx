import { useContext, useEffect, useState } from 'react';

import { getDatabase, off, onDisconnect, onValue, ref, set, update } from 'firebase/database';
import { LatLngBoundsExpression, LatLngTuple } from 'leaflet';
import { useAuth } from '../../contexts/AuthContext';
import { GameBoundingBoxContext } from '../../contexts/GameBoundingBoxContext';
import { PlayerContext, PlayerProvider } from '../../contexts/PlayerContext';
import UserCircle from './UserCircle';

const Player = () => {
	const [playerLocation, setPlayerLocation] = useState<[number, number]>([0, 0]);
	const database = getDatabase();
	const { currentUser } = useAuth();
	const [watchId, setWatchId] = useState<any>();

	/* --------------------------- Player Handling ---------------------------- */
	let { players, setPlayers } = useContext(PlayerContext);
	const playerIdRef = ref(database, 'players/' + currentUser?.uid);
	const allPlayersRef = ref(database, 'players/');
	const currentPlayer = players.find((player: any) => player.id === currentUser?.uid);
	const playerColors = ['blue', 'green', 'pink', 'yellow', 'purple', 'orange', 'black'];
	const width = 0.000095;
	const height = 0.00015;
	const [playerNorthWest, setPlayerNorthWest] = useState<LatLngTuple>([0, 0]);
	const [playerSouthEast, setPlayerSouthEast] = useState<LatLngTuple>([0, 0]);

	/* ----------------------- add player to database and set color --------------------------- */
	function trimUserEmail(email: string | null) {
		return email?.replace(/@.*/, '');
	}
	useEffect(() => {
		if (currentUser) {
			const playerRef = ref(database, 'players/' + currentUser.uid);

			onValue(playerRef, (snapshot) => {
				const objectLength = snapshot.val() ? Object.keys(snapshot.val()).length : 0;
				if (!snapshot.exists() || objectLength < 6) {
					set(playerRef, {
						id: currentUser.uid,
						name: trimUserEmail(currentUser.email),
						isSearching: false,
						color: 'grey',
						latLongCoordinates: playerLocation,
						colorIsSet: false,
						outsideOfPlayingField: false,
						isColliding: false,
					});
				}
			});
			handleDisconnect(playerRef);
		}
	}, [playerIdRef, currentUser]);

	const handleDisconnect = (ref: any) => {
		const disconnect = onDisconnect(ref);
		disconnect.remove();
	};

	// ---------------- set color for player ----------------
	function setPlayerColor() {
		if (!currentPlayer?.colorIsSet) {
			const usedColors = players.map((player: any) => player.color);
			const availableColors = playerColors.filter((color) => !usedColors.includes(color));

			if (availableColors.length > 0) {
				if (currentPlayer?.isSearching) {
					update(playerIdRef, {
						color: 'red',
						colorIsSet: true,
					});
				} else {
					update(playerIdRef, {
						color: availableColors[0],
						colorIsSet: true,
					});
				}
			}
		}
	}

	/* ----------------- get all player from database and write them to my players context --------------- */
	useEffect(() => {
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

	/* ----------------------------------- update player location ---------------------------------------- */

	// get player location and set it to local `playerLocation` variable
	useEffect(() => {
		const id: any = navigator.geolocation.watchPosition(
			(position: any) => {
				console.log('getting Location');
				setPlayerLocation([position.coords.latitude, position.coords.longitude]);
			},
			(error) => {
				console.error(error);
			}
		);

		setWatchId(id);

		return () => {
			navigator.geolocation.clearWatch(watchId);
		};
	}, []);

	useEffect(() => {
		setPlayerNorthWest([playerLocation[0] + width, playerLocation[1] - height]);
		setPlayerSouthEast([playerLocation[0] - width, playerLocation[1] + height]);
	}, [playerLocation]);

	// set player location in database
	useEffect(() => {
		if (currentPlayer && playerLocation[0] !== 0) {
			update(playerIdRef, {
				latLongCoordinates: playerLocation,
				boundingBox: {
					northWest: playerNorthWest,
					southEast: playerSouthEast,
				},
			});
		}
	}, [playerLocation, playerNorthWest, playerSouthEast]);

	useEffect(() => {
		onValue(playerIdRef, (snapshot) => {
			if (snapshot.val()) {
				// setPlayerLocation(snapshot.val().latLongCoordinates);
			}
		});
	}, [playerIdRef]);

	// ----------- determine if player is outside of playing field ----------------
	const { gameBoundingBoxNorthWest, gameBoundingBoxSouthEast } = useContext(GameBoundingBoxContext);

	useEffect(() => {
		if (gameBoundingBoxNorthWest && gameBoundingBoxSouthEast && playerLocation) {
			const isOutsideOfPlayingField = playerNorthWest[0] > gameBoundingBoxNorthWest[0] || playerSouthEast[0] < gameBoundingBoxSouthEast[0] || playerNorthWest[1] < gameBoundingBoxNorthWest[1] || playerSouthEast[1] > gameBoundingBoxSouthEast[1];

			if (currentPlayer && playerLocation[0] !== 0) {
				update(playerIdRef, {
					outsideOfPlayingField: isOutsideOfPlayingField,
				});
			}
		}
	}, [gameBoundingBoxNorthWest, gameBoundingBoxSouthEast, playerLocation, playerNorthWest, playerSouthEast]);

	// --------- update player boundingBox when coordinates change ----------------
	useEffect(() => {
		if (currentPlayer && playerLocation[0] !== 0) {
			update(playerIdRef, {
				boundingBox: {
					northWest: playerNorthWest,
					southEast: playerSouthEast,
				},
			});
		}
	}, [playerLocation, playerNorthWest, playerSouthEast]);

	// --------- determine if player is colliding with other players ----------------
	useEffect(() => {
		if (currentPlayer && playerLocation[0] !== 0) {
			const isColliding = players.some((player: any) => {
				if (player.id !== currentPlayer.id && player.boundingBox) {
					const otherPlayerNorthWest = player.boundingBox.northWest;
					const otherPlayerSouthEast = player.boundingBox.southEast;

					return (
						(otherPlayerNorthWest[1] < playerSouthEast[1] && otherPlayerNorthWest[0] > playerSouthEast[0] && otherPlayerNorthWest[0] < playerNorthWest[0] && otherPlayerNorthWest[1] > playerNorthWest[1]) ||
						(otherPlayerNorthWest[1] < playerSouthEast[1] && playerNorthWest[0] > otherPlayerSouthEast[0] && playerSouthEast[0] < otherPlayerSouthEast[0] && playerNorthWest[1] < otherPlayerNorthWest[1]) ||
						(playerNorthWest[1] < otherPlayerSouthEast[1] && otherPlayerNorthWest[0] > playerSouthEast[0] && otherPlayerSouthEast[0] < playerSouthEast[0] && playerSouthEast[1] > otherPlayerSouthEast[1]) ||
						(playerNorthWest[1] < otherPlayerSouthEast[1] && playerNorthWest[0] > otherPlayerSouthEast[0] && otherPlayerSouthEast[1] < playerSouthEast[1] && otherPlayerSouthEast[0] > playerSouthEast[0])
					);
				}
			});

			update(playerIdRef, {
				isColliding: isColliding,
			});
		}
	}, [playerLocation, players, playerNorthWest, playerSouthEast]);

	return (
		<div>
			{players.map((player) => (
				<div key={player.id + player.id}>
					<UserCircle
						color={player.color}
						playerName={player.name}
						isSearching={player.isSearching}
						latLongCoordinates={player.latLongCoordinates}
						outsideOfPlayingField={player.outsideOfPlayingField}
						isColliding={player.isColliding}
					/>
				</div>
			))}
		</div>
	);
};

export default Player;
