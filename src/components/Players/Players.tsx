import playerHandler from '../../containers/playerHandler';
import { Users } from '../PlayingScreen/Map/User/AllUserCircles';

const Players = () => {
	const players = [
		{
			name: 'Andre',
			color: 'black',
			isSearching: true,
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

	// console.log(playerss);
	playerHandler();

	return (
		<div>
			{players &&
				players.map((player, idx) => (
					<div key={idx}>
						{player.name} {player.isSearching ? 'x' : null}
					</div>
				))}
		</div>
	);
};

export default Players;
