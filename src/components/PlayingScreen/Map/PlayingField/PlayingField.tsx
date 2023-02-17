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

	// Die zwei Circle Komponente sind nur als veranschaulichung der Grenzen da, die später durch die Rectangle Komponente ersetzt werden sollen
	// in der Datenbank sind das die "game/boundingBox/northWest" und "game/boundingBox/southEast (siehe Bilder in der Dokumentation)
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
