import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import './Map.css';

import PlayingField from './PlayingField/PlayingField';

import playerHandler from '../../Players/playerHandler';
import Players from '../../Players/Players';

const defaultCenter: LatLngExpression = [48.83852223540835, 10.07696360335071];
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
				<PlayingField />

				<Players />
			</MapContainer>
		</div>
	);
};

export default Map;
