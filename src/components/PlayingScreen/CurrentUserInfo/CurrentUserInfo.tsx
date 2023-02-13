import { getDatabase, ref, update } from 'firebase/database';
import React, { useContext } from 'react';

import { useAuth } from '../../../contexts/AuthContext';
import { GameContext } from '../../../contexts/GameContext';
import { PlayerContext } from '../../../contexts/PlayerContext';

import Button from '../../atoms/Button';

interface ICurrentUserInfo {
	currentUser: any;
}

const CurrentUserInfo = () => {
	const { currentUser } = useAuth();
	const { players, setPlayers } = useContext(PlayerContext);
	const { gameRunning } = useContext(GameContext);
	const database = getDatabase();

	function handleJoinHidingTeam() {
		const playerRef = ref(database, 'players/' + currentUser?.uid);
		update(playerRef, {
			isSearching: false,
		});
	}
	function handleJoinSeekingTeam() {
		const playerRef = ref(database, 'players/' + currentUser?.uid);
		update(playerRef, {
			isSearching: true,
		});
	}

	return (
		<>
			<div>Current User: {currentUser ? currentUser.email : null}</div>
			<div className="flex justify-between p-4">
				<div>
					<ul>
						versteckende Spieler:
						{players?.map((player: any) => (player.isSearching ? null : <li key={player.id}>{player.name}</li>))}
					</ul>
					{gameRunning ? null : (
						<Button
							text="Join Team"
							onClick={handleJoinHidingTeam}
						/>
					)}
				</div>

				<div>
					<ul>
						suchende Spieler:
						{players?.map((player: any) => (player.isSearching ? <li key={player.name}>{player.name}</li> : null))}
					</ul>
					{gameRunning ? null : (
						<Button
							text="Join Team"
							onClick={handleJoinSeekingTeam}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default CurrentUserInfo;
