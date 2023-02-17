import { getDatabase, onValue, ref, set, update } from 'firebase/database';
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import React, { createContext, FC, ReactNode, useEffect, useState } from 'react';

interface IGameBoundingBoxContext {
	gameBoundingBoxCenter: [number, number];
	setGameBoundingBoxCenter: React.Dispatch<React.SetStateAction<any>>;
	gameBoundingBoxNorthWest: any;
	gameBoundingBoxSouthEast: any;
}

interface IGameBoundingBoxProvider {
	children?: ReactNode;
}

export const GameBoundingBoxContext = createContext<IGameBoundingBoxContext>({
	gameBoundingBoxCenter: [0, 0],
	setGameBoundingBoxCenter: () => {},
	gameBoundingBoxNorthWest: [0, 0],
	gameBoundingBoxSouthEast: [0, 0],
} as IGameBoundingBoxContext);

export const GameBoundingBoxProvider: FC<IGameBoundingBoxProvider> = ({ children }: any) => {
	const [gameBoundingBoxCenter, setGameBoundingBoxCenter] = useState<any>([48.83852223540835, 10.07696360335071]);

	const database = getDatabase();
	const gameRef = ref(database, 'game/');
	const gameBoundingBoxRef = ref(database, 'game/boundingBox');

	// ----------------- calculate the bounding box of the playing field -----------------
	const width = 0.0025;
	const height = 0.0015;

	const gameBoundingBoxNorthWest: LatLngExpression = [gameBoundingBoxCenter[0] + height / 2, gameBoundingBoxCenter[1] - width / 2];
	const gameBoundingBoxSouthEast: LatLngExpression = [gameBoundingBoxCenter[0] - height / 2, gameBoundingBoxCenter[1] + width / 2];

	// ----------------- write northWest and southEast to database -----------------
	useEffect(() => {
		update(gameBoundingBoxRef, { northWest: gameBoundingBoxNorthWest });
		update(gameBoundingBoxRef, { southEast: gameBoundingBoxSouthEast });
	}, [gameBoundingBoxCenter]);

	useEffect(() => {
		onValue(gameRef, (snapshot) => {
			if (!snapshot.exists()) {
				set(gameRef, {
					boundingBoxCenter: [48.83852223540835, 10.07696360335071],
				});
			} else {
				setGameBoundingBoxCenter(snapshot.val().boundingBoxCenter);
			}
		});
	}, []);

	return <GameBoundingBoxContext.Provider value={{ gameBoundingBoxCenter, setGameBoundingBoxCenter, gameBoundingBoxNorthWest, gameBoundingBoxSouthEast }}>{children}</GameBoundingBoxContext.Provider>;
};
