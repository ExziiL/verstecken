import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import './Map.css';

import { useContext } from 'react';

import { PlayerContext } from '../../../contexts/PlayerContext';

import PlayingField from './PlayingField/PlayingField';

import playerHandler from '../../Players/playerHandler';
import Players from '../../Players/Players';

const Map = () => {
	const { players } = useContext(PlayerContext);

	const defaultCenter: LatLngExpression = [48.83852223540835, 10.07696360335071];
	const defaultZoom = 17;

	// ----------------- calculate the bounding box of the playing field -----------------

	const width = 0.0025;
	const height = 0.0015;

	const northWest: LatLngExpression = [defaultCenter[0] + height / 2, defaultCenter[1] - width / 2];
	const southEast: LatLngExpression = [defaultCenter[0] - height / 2, defaultCenter[1] + width / 2];

	const playingFieldBorder: LatLngBoundsExpression = [northWest, southEast];

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
				<PlayingField boundingBoxRectangle={playingFieldBorder} />

				<Players />
			</MapContainer>
		</div>
	);
};

export default Map;
