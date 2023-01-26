import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import Button from '../atoms/Button';
import Label from '../atoms/Label';
import Login from './Login';

function LoginCard() {
	const emailRef = useRef<any>();
	const passwordRef = useRef<any>();

	const navigate = useNavigate();

	const { login } = useAuth();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: any) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			navigate('/');
		} catch (err) {
			console.error(err);
			setError('Failed to sign in');
		}

		setLoading(false);
	}

	return (
		<div className="mb-4 max-w-sm">
			<h1 className="text-center m-10 text-4xl">Anmelden</h1>
			{error && <div className="bg-red-600 text-xl p-4 text-white mb-6">Error: {error}</div>}
			<form onSubmit={handleSubmit}>
				<Label
					id="email"
					header="E-Mail"
					type="email"
					name="email"
					ref={emailRef}
				/>
				<Label
					id="password"
					header="Passwort"
					type="password"
					name="password"
					ref={passwordRef}
				/>
				<div className="w-full">
					<Button
						disabled={loading}
						text="Login"
					/>
				</div>
			</form>
		</div>
	);
}

export default LoginCard;
