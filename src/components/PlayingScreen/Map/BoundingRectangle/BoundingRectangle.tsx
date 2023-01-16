import { LatLngBoundsExpression } from 'leaflet';
import { Rectangle } from 'react-leaflet';

const BoundingRectangle = () => {
	const rectangle: LatLngBoundsExpression = [
		[48.84019111595303, 10.066012753769945],
		[48.84177180973673, 10.069215045354168],
	];

	const colorOptions = { color: 'black' };

	return (
		<Rectangle
			bounds={rectangle}
			pathOptions={colorOptions}
		/>
	);
};

export default BoundingRectangle;
