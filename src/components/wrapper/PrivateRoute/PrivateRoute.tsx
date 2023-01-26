import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

interface IPrivateRoute {
	component: any;
}

const PrivateRoute: FC<IPrivateRoute> = ({ component: Component }) => {
	const { currentUser } = useAuth();

	return currentUser ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
