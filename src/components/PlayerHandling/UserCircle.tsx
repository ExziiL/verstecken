import { LatLngBoundsExpression, LatLngExpression, LatLngTuple } from 'leaflet';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Circle, Rectangle, SVGOverlay, Tooltip } from 'react-leaflet';
import { useAuth } from '../../contexts/AuthContext';
import { PlayerContext } from '../../contexts/PlayerContext';

export interface IUserCircle {
	color: string;
	playerName: string;
	isSearching: boolean;
	latLongCoordinates: LatLngTuple;
	outsideOfPlayingField: boolean;
	isColliding: boolean;
}

// UserCircle is the circle that represents the player on the map
const UserCircle: FC<IUserCircle> = ({ color, playerName, isSearching, outsideOfPlayingField, latLongCoordinates, isColliding }) => {
	const fillColor = { color: color };
	const searchingColor = { color: 'red' };

	const [playerBoundingBox, setPlayerBoundingBox] = useState<any>([
		[0, 0],
		[0, 0],
	]);

	// ------- update playerBoundingBox when playerLocation changes -------
	useEffect(() => {
		if (latLongCoordinates) {
			const width = 0.00029;
			const height = 0.00019;
			const lat = latLongCoordinates[0];
			const long = latLongCoordinates[1];
			const northWest: LatLngExpression = [lat + height / 2, long - width / 2];
			const southEast: LatLngExpression = [lat - height / 2, long + width / 2];
			const newPlayerBoundingBox: LatLngBoundsExpression = [northWest, southEast];
			setPlayerBoundingBox(newPlayerBoundingBox);
		}
	}, [latLongCoordinates]);

	// Circle is a component from react-leaflet, it creates a circle on the map
	// Tooltip is a component from react-leaflet, it creates a tooltip on the map, when clicked on the circle
	return (
		<div key={playerName}>
			<Circle
				center={latLongCoordinates as LatLngTuple}
				pathOptions={isSearching ? searchingColor : isColliding ? { color: 'yellow' } : outsideOfPlayingField ? { color: 'black' } : fillColor}
				radius={10}
				stroke={true}
				opacity={0.5}
				key={playerName}
			>
				<Tooltip>{playerName}</Tooltip>
			</Circle>
		</div>
	);
};

export default UserCircle;
