import { getDatabase, onValue, ref, set, update } from 'firebase/database';
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FC, useContext, useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { PlayerContext } from '../../../contexts/PlayerContext';
import Player from '../../PlayerHandling/Player';
import './Map.css';
import PlayingField from './PlayingField/PlayingField';

interface IMap {
	hidden: boolean;
}

const Map: FC<IMap> = ({ hidden }) => {
	const database = getDatabase();
	const gameRef = ref(database, 'game/');
	const [boundingBoxCenter, setBoundingBoxCenter] = useState<any>([0, 0]);

	const defaultCenter: LatLngExpression = [48.83852223540835, 10.07696360335071];
	const defaultZoom = 17;

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

	return (
		<div className={hidden ? 'hidden' : ''}>
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

				<Player />
			</MapContainer>
		</div>
	);
};

export default Map;
