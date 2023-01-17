import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../context/AuthContext';

import Button from '../../atoms/Button';

const Navbar = () => {
	const [error, setError] = React.useState('');

	const navigate = useNavigate();

	const { logout } = useAuth();

	const handleLogout = async () => {
		setError('');

		try {
			await logout();
			navigate('/login');
		} catch {
			setError('Failed to log out');
		}
	};

	return (
		<>
			<div className="flex justify-between items-center p-2 mb-6 shadow-md">
				<div>Verstecken</div>
				<div className="">
					<Button
						text="Abmelden"
						onClick={handleLogout}
					/>
				</div>
			</div>
			<div>{error && <div className="bg-red-600 text-xl p-4 text-white mb-6">Error: {error}</div>}</div>
		</>
	);
};

export default Navbar;
