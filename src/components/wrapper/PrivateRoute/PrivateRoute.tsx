import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

interface IPrivateRoute {
	component: any;
}

// PrivateRoute is a wrapper component that checks if the user is logged in, if not, the user gets redirected to the login page
const PrivateRoute: FC<IPrivateRoute> = ({ component: Component }) => {
	const { currentUser } = useAuth();

	return currentUser ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
