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
	const defaultCenter: LatLngExpression = [48.83852223540835, 10.07696360335071];
	const defaultZoom = 17;

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

				<PlayingField />

				<Player />
			</MapContainer>
		</div>
	);
};

export default Map;
