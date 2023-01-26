import User from './UserCircle';

export const Users = () => {
	const users = [
		{
			name: 'Andre',
			color: 'black',
			isSearching: false,
		},
		// {
		// 	name: 'John',
		// 	color: 'yellow',
		// 	isSearching: false,
		// },
		// {
		// 	name: 'Laura',
		// 	color: 'green',
		// 	isSearching: false,
		// },
		// {
		// 	name: 'Jonathan',
		// 	color: 'yellow',
		// 	isSearching: true,
		// },
	];

	return (
		<div>
			{users.map((user, idx) => (
				<User
					key={idx}
					player={user.name}
					color={user.color}
					isSearching={user.isSearching}
				/>
			))}
		</div>
	);
};
