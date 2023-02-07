import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

import { off, onChildAdded, onDisconnect, onValue, ref, set } from 'firebase/database';
import { database } from '../firebase';
import { useAuth } from './AuthContext';

interface IPlayerContext {
	players: any[];
	setPlayers: React.Dispatch<React.SetStateAction<any[]>>;
}

interface IPlayerProvider {
	children?: ReactNode;
}

export const PlayerContext = createContext<IPlayerContext>({
	players: [],
	setPlayers: () => {},
} as IPlayerContext);

export const PlayerProvider: FC<IPlayerProvider> = ({ children }: any) => {
	const [players, setPlayers] = useState<any[]>([]);

	let allPlayersRef = ref(database, 'players/');

	useEffect(() => {
		// -------------------------------------
		onValue(allPlayersRef, (snapshot: any) => {
			if (snapshot.val()) {
				setPlayers(Object.values(snapshot.val()));
			}
		});

		return () => {
			off(allPlayersRef);
		};
		// -------------------------------------
	}, []);

	return <PlayerContext.Provider value={{ players, setPlayers }}>{children}</PlayerContext.Provider>;
};
