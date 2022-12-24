import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import './Map.css';

import BoundingRectangle from './BoundingRectangle/BoundingRectangle';

const defaultCenter: LatLngExpression = [48.84082223540835, 10.06707360335071];
const defaultZoom = 17;

const Map = () => {
	return (
		<div>
			<MapContainer
				id="map"
				center={defaultCenter}
				zoom={defaultZoom}
				// scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<BoundingRectangle />
			</MapContainer>
		</div>
	);
};

export default Map;
