import { LatLngBoundsExpression } from 'leaflet';
import { FC } from 'react';
import { Rectangle } from 'react-leaflet';

interface IPlayingField {
	boundingBoxRectangle: LatLngBoundsExpression;
}

const PlayingField: FC<IPlayingField> = ({ boundingBoxRectangle }) => {
	const colorOptions = { color: 'black' };

	return (
		<Rectangle
			bounds={boundingBoxRectangle}
			pathOptions={colorOptions}
		/>
	);
};

export default PlayingField;
