import { getDatabase, ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Label from '../atoms/Label';

const PlayerName = () => {
	const { currentUser } = useAuth();

	const database = getDatabase();
	const playerRef = ref(database, 'players/' + currentUser?.uid);

	const [name, setName] = useState<string>('');

	useEffect(() => {
		const storedName = localStorage.getItem('playerName');
		if (storedName) {
			// update(playerRef, {
			//     name: storedName,
			// });
			setName(storedName);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('playerName', name);
	}, [name]);

	const handleInputChange = (event: any) => {
		event.preventDefault();

		setName(event.target.value);
		update(playerRef, {
			name: event.target.value,
		});
	};

	return (
		<form
			onSubmit={handleInputChange}
			className="flex flex-col"
		>
			<label className="w-full p-2">
				Name:
				<input
					className="border border-black p-1 ml-2 rounded-lg"
					type="text"
					value={name}
					onChange={handleInputChange}
				/>
			</label>
		</form>
	);
};

export default PlayerName;
