import { getDatabase, onValue, ref, update } from 'firebase/database';
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import { FC, useEffect, useState } from 'react';
import { Rectangle } from 'react-leaflet';

interface IPlayingField {}

const PlayingField: FC<IPlayingField> = () => {
	const database = getDatabase();
	const gameRef = ref(database, 'game/');
	const [boundingBoxCenter, setBoundingBoxCenter] = useState<any>([0, 0]);

	const defaultCenter: LatLngExpression = [48.83852223540835, 10.07696360335071];

	// ----------------- set initial bounding box center -----------------
	if (boundingBoxCenter[0] === defaultCenter[0] && boundingBoxCenter[1] === defaultCenter[1]) {
		update(gameRef, { boundingBoxCenter: defaultCenter });
	}

	// ----------------- get bounding box center -----------------
	useEffect(() => {
		const boundingBoxCenterRef = ref(database, 'game/boundingBoxCenter');
		onValue(boundingBoxCenterRef, (snapshot) => {
			setBoundingBoxCenter(snapshot.val());
		});
	}, []);

	// ----------------- calculate the bounding box of the playing field -----------------
	const width = 0.0025;
	const height = 0.0015;

	const northWest: LatLngExpression = [boundingBoxCenter[0] + height / 2, boundingBoxCenter[1] - width / 2];
	const southEast: LatLngExpression = [boundingBoxCenter[0] - height / 2, boundingBoxCenter[1] + width / 2];

	const playingFieldBorder: LatLngBoundsExpression = [northWest, southEast];

	const colorOptions = { color: 'black' };

	return (
		<Rectangle
			bounds={playingFieldBorder}
			pathOptions={colorOptions}
		/>
	);
};

export default PlayingField;
