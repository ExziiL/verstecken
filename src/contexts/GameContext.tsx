import { getDatabase, onValue, ref, set, update } from 'firebase/database';
import React, { createContext, FC, ReactNode, useEffect, useState } from 'react';

interface IGameContext {
	seconds: number;
	setSeconds: React.Dispatch<React.SetStateAction<any>>;
}

interface IGameProvider {
	children?: ReactNode;
}

export const GameContext = createContext<IGameContext>({
	seconds: 0,
	setSeconds: () => {},
} as IGameContext);

export const GameProvider: FC<IGameProvider> = ({ children }: any) => {
	const [seconds, setSeconds] = useState(0);

	const database = getDatabase();
	const gameRef = ref(database, 'game/');

	useEffect(() => {
		onValue(gameRef, (snapshot) => {
			if (!snapshot.exists()) {
				set(gameRef, {
					gameRunning: false,
					timePlayed: seconds,
				});
			} else {
				const data = snapshot.val();
				setSeconds(data.timePlayed);
			}
		});
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			update(gameRef, {
				gameRunning: true,
				timePlayed: seconds + 1,
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [seconds]);

	return <GameContext.Provider value={{ seconds, setSeconds }}>{children}</GameContext.Provider>;
};
