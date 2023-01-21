import { Users } from '../Map/User/Users';

import HidingPlayer from './HidingPlayer';
import SeekingPlayer from './SeekingPlayer';

const Players = () => {
	const players = [
		{
			name: 'Andre',
			color: 'black',
			isSearching: false,
		},
		// 	{
		// 		name: 'John',
		// 		color: 'yellow',
		// 		isSearching: false,
		// 	},
		// 	{
		// 		name: 'Laura',
		// 		color: 'green',
		// 		isSearching: false,
		// 	},
		// 	{
		// 		name: 'Jonathan',
		// 		color: 'yellow',
		// 		isSearching: true,
		// 	},
	];
	return (
		<div>
			{players &&
				players.map((player, idx) => (
					<div key={idx}>
						{player.name} {player.isSearching ? 'x' : null}
					</div>
				))}

			<SeekingPlayer players={players} />
			<HidingPlayer players={players} />
		</div>
	);
};

export default Players;
