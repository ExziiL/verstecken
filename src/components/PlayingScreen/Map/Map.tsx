import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import './Map.css';

import BoundingRectangle from './BoundingRectangle/BoundingRectangle';
import { Users } from './User/Users';

const defaultCenter: LatLngExpression = [48.84092223540835, 10.06756360335071];
const defaultZoom = 17;

const Map = () => {
	return (
		<div>
			<MapContainer
				id="map"
				center={defaultCenter}
				zoom={defaultZoom}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<BoundingRectangle />
				<Users />
			</MapContainer>
		</div>
	);
};

export default Map;
