import { getDatabase, ref, update } from 'firebase/database';
import React, { useContext } from 'react';

import { useAuth } from '../../../contexts/AuthContext';
import { GameContext } from '../../../contexts/GameContext';
import { PlayerContext } from '../../../contexts/PlayerContext';

import Button from '../../atoms/Button';

const CurrentUserInfo = () => {
	const { currentUser } = useAuth();
	const { players, setPlayers } = useContext(PlayerContext);
	const { gameRunning } = useContext(GameContext);
	const database = getDatabase();

	function switchTeam() {
		const playerRef = ref(database, 'players/' + currentUser?.uid);

		update(playerRef, {
			isSearching: !players?.find((player: any) => player.id === currentUser?.uid)?.isSearching,
		});
	}

	return (
		<>
			<div>Current User: {currentUser ? currentUser.email : null}</div>
			<div className="w-40">
				{gameRunning ? null : (
					<Button
						className=""
						text="Switch Team"
						onClick={switchTeam}
					/>
				)}
			</div>
			<div className="flex justify-between p-4">
				<div>
					<ul>
						versteckende Spieler:
						{players?.map((player: any) =>
							player.isSearching ? null : (
								<div
									className="flex"
									key={player.id}
								>
									<div
										style={{ backgroundColor: player.color }}
										className={`w-2 h-2 rounded-full self-center mr-1.5`}
									></div>
									<li key={player.id}>{player.name}</li>
								</div>
							)
						)}
					</ul>
				</div>

				<div>
					<ul>
						suchende Spieler:
						{players?.map((player: any) =>
							player.isSearching ? (
								<div
									className="flex"
									key={player.id}
								>
									<div
										style={{ backgroundColor: player.isSearching ? 'red' : player.color }}
										className={`w-2 h-2 rounded-full self-center mr-1.5`}
									></div>
									<li key={player.name}>{player.name}</li>
								</div>
							) : null
						)}
					</ul>
				</div>
			</div>
		</>
	);
};

export default CurrentUserInfo;
