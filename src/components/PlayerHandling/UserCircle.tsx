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
}

const UserCircle: FC<IUserCircle> = ({ color, playerName, isSearching, outsideOfPlayingField, latLongCoordinates }) => {
	const fillColor = { color: color };
	const searchingColor = { color: 'red' };

	const [playerBoundingBox, setPlayerBoundingBox] = useState<any>([
		[0, 0],
		[0, 0],
	]);

	// ------- update playerBoundingBox when playerLocation changes -------
	useEffect(() => {
		const width = 0.00029;
		const height = 0.00019;
		const lat = latLongCoordinates[0];
		const long = latLongCoordinates[1];
		const northWest: LatLngExpression = [lat + height / 2, long - width / 2];
		const southEast: LatLngExpression = [lat - height / 2, long + width / 2];
		const newPlayerBoundingBox: LatLngBoundsExpression = [northWest, southEast];
		setPlayerBoundingBox(newPlayerBoundingBox);
	}, [latLongCoordinates]);

	return (
		<div key={playerName}>
			{/* ---------------------- kann später gelöscht werden */}
			<Circle
				center={playerBoundingBox[0]}
				radius={2.5}
				pathOptions={{ color: 'red' }}
				opacity={1}
			></Circle>
			<Circle
				center={playerBoundingBox[1]}
				radius={2.5}
				pathOptions={{ color: 'red' }}
				opacity={1}
			></Circle>
			{/* ---------------------- */}
			<Rectangle bounds={playerBoundingBox}>
				<Tooltip>{playerName}</Tooltip>
			</Rectangle>
			<Circle
				center={latLongCoordinates as LatLngTuple}
				pathOptions={outsideOfPlayingField ? { color: 'black' } : isSearching ? searchingColor : fillColor}
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
