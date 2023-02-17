import { getDatabase, onValue, ref, update } from 'firebase/database';
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import { FC, useContext, useEffect, useState } from 'react';
import { Circle, Rectangle } from 'react-leaflet';
import { GameBoundingBoxContext } from '../../../../contexts/GameBoundingBoxContext';

interface IPlayingField {}

const PlayingField: FC<IPlayingField> = () => {
	const database = getDatabase();
	const { gameBoundingBoxCenter, setGameBoundingBoxCenter, gameBoundingBoxNorthWest, gameBoundingBoxSouthEast } = useContext(GameBoundingBoxContext);

	const playingFieldBorder: any = [gameBoundingBoxNorthWest, gameBoundingBoxSouthEast];

	const colorOptions = { color: 'black' };

	return (
		<>
			{/* ---------------------- */}
			<Circle
				center={playingFieldBorder[0]}
				radius={2.5}
				pathOptions={{ color: 'red' }}
				opacity={1}
			></Circle>
			<Circle
				center={playingFieldBorder[1]}
				radius={2.5}
				pathOptions={{ color: 'red' }}
				opacity={1}
			></Circle>
			{/* ---------------------- */}
			<Rectangle
				bounds={playingFieldBorder}
				pathOptions={colorOptions}
			/>
		</>
	);
};

export default PlayingField;
