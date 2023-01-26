import { LatLngTuple } from 'leaflet';
import React, { FC, useEffect, useState } from 'react';
import { Circle, SVGOverlay, Tooltip } from 'react-leaflet';

export interface IUser {
	color: string;
	player: string;
	isSearching: boolean;
}

const User: FC<IUser> = ({ color, player, isSearching }) => {
	// get users Location
	const [location, setLocation] = useState<any[]>([0, 0]);
	const [watchId, setWatchId] = useState<any>();

	useEffect(() => {
		const id: any = navigator.geolocation.watchPosition(
			(position: any) => {
				setLocation([position.coords.latitude, position.coords.longitude]);
			},
			(error) => {
				//TODO bessere Errorausgabe in den Geoinf-Unterlagen
				console.error(error);
			}
		);
		setWatchId(id);
		return () => {
			navigator.geolocation.clearWatch(watchId);
		};
	}, []);

	// set searching status
	const [userIsSearching, setUserIsSearching] = useState(isSearching);

	const fillColor = { color: color };
	const searchingColor = { color: 'red' };

	return (
		<div>
			<Circle
				center={location as LatLngTuple}
				pathOptions={userIsSearching ? searchingColor : fillColor}
				radius={10}
				stroke={true}
				opacity={0.5}
			>
				<Tooltip>{player}</Tooltip>
			</Circle>
		</div>
	);
};

export default User;
