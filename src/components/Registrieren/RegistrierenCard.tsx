import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import Button from '../atoms/Button';
import Label from '../atoms/Label';
import Signup from './Registrieren';

function SignupCard() {
	const emailRef = useRef<any>();
	const passwordRef = useRef<any>();
	const passwordConfirmRef = useRef<any>();

	const navigate = useNavigate();

	const { signup } = useAuth();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: any) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Passwords do not match');
		}

		try {
			setError('');
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			navigate('/');
		} catch (err) {
			console.error(err);
			setError('Failed to create an account');
		}

		setLoading(false);
	}

	return (
		<div className="mb-4">
			<h1 className="text-center m-10 text-4xl">Registrieren</h1>
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
				<Label
					id="password-confirm"
					header="Passwort bestätigen"
					type="password"
					name="password-confirm"
					ref={passwordConfirmRef}
				/>
				<Button
					disabled={loading}
					text="Sign Up"
				/>
			</form>
		</div>
	);
}

export default SignupCard;
