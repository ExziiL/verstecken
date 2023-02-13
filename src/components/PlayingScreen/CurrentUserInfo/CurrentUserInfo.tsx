import React, { useContext } from 'react';

import { useAuth } from '../../../contexts/AuthContext';
import { PlayerContext } from '../../../contexts/PlayerContext';

interface ICurrentUserInfo {
	currentUser: any;
}

const CurrentUserInfo = () => {
	const { currentUser } = useAuth();
	const { players, setPlayers } = useContext(PlayerContext);

	return (
		<>
			<div>Current User: {currentUser ? currentUser.email : null}</div>
			<div className="flex justify-between p-4">
				<ul>
					versteckende Spieler:
					{players?.map((player: any) => (player.isSearching ? null : <li key={player.id}>{player.name}</li>))}
				</ul>

				<ul>
					suchende Spieler:
					{players?.map((player: any) => (player.isSearching ? <li key={player.name}>{player.name}</li> : null))}
				</ul>
			</div>
		</>
	);
};

export default CurrentUserInfo;
