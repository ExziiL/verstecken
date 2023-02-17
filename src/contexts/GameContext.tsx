import { getDatabase, onValue, ref, set, update } from 'firebase/database';
import React, { createContext, FC, ReactNode, useEffect, useState } from 'react';

interface IGameContext {
	seconds: number;
	gameRunning: boolean;
	setGameRunning: React.Dispatch<React.SetStateAction<any>>;
}

interface IGameProvider {
	children?: ReactNode;
}

export const GameContext = createContext<IGameContext>({
	seconds: 0,
	gameRunning: false,
	setGameRunning: () => {},
} as IGameContext);

// GameProvider is responsible for the game time and the game state
export const GameProvider: FC<IGameProvider> = ({ children }: any) => {
	const [seconds, setSeconds] = useState(0);
	const [gameRunning, setGameRunning] = useState(false);

	const database = getDatabase();
	const gameRef = ref(database, 'game/');

	useEffect(() => {
		onValue(gameRef, (snapshot) => {
			if (!snapshot.exists()) {
				set(gameRef, {
					gameRunning: false,
					seconds: seconds,
				});
			} else {
				const { seconds, gameRunning } = snapshot.val();
				setSeconds(seconds);
				setGameRunning(gameRunning);
			}
		});
	}, []);

	useEffect(() => {
		if (gameRunning) {
			const intervalId = setInterval(() => {
				update(gameRef, {
					gameRunning: true,
					seconds: seconds + 1,
				});
			}, 1000);

			return () => clearInterval(intervalId);
		}
	}, [seconds, gameRunning]);

	return <GameContext.Provider value={{ seconds, gameRunning, setGameRunning }}>{children}</GameContext.Provider>;
};
