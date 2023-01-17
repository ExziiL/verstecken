import React from 'react';

import { useAuth } from '../../../context/AuthContext';

interface ICurrentUserInfo {
	currentUser: any;
}

const CurrentUserInfo = () => {
	const { currentUser } = useAuth();

	return (
		<div>
			<div>Current User: {currentUser ? currentUser.email : null}</div>
		</div>
	);
};

export default CurrentUserInfo;
