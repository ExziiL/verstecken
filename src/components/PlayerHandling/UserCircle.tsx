import { LatLngTuple } from 'leaflet';
import React, { FC, useEffect, useState } from 'react';
import { Circle, SVGOverlay, Tooltip } from 'react-leaflet';

export interface IUserCircle {
	color: string;
	playerName: string;
	isSearching: boolean;
	latLongCoordinates: LatLngTuple;
}

const UserCircle: FC<IUserCircle> = ({ color, playerName, isSearching, latLongCoordinates }) => {
	const fillColor = { color: color };
	const searchingColor = { color: 'red' };

	return (
		<div key={playerName}>
			<Circle
				center={latLongCoordinates as LatLngTuple}
				pathOptions={isSearching ? searchingColor : fillColor}
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
