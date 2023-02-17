import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import Button from '../atoms/Button';
import Label from '../atoms/Label';
import Signup from './Registrieren';

// Hier drunter werden die Funktionen definiert, die für die Registrierung benötigt werden
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
			<div>
				Hinweis:
				<ul>
					<li>- Der Name vor dem "@"-Zeichen in der E-Mail wird automatisch zum Spielernamen.</li>
					<li>- Es kann eine beliebige E-Mail angegeben werden. Sie muss nicht existieren, aber das E-Mail-Format muss beibehalten werden.</li>
					<li className="font-bold">- Passwort muss mindestens 6 Zeichen lang sein.</li>
				</ul>
			</div>
			<br />
			<form onSubmit={handleSubmit}>
				<Label
					id="email"
					header="E-Mail"
					type="email"
					name="email"
					ref={emailRef}
					placeholder="xxxxx@xxxxx.xx"
				/>
				<Label
					id="password"
					header="Passwort"
					type="password"
					name="password"
					ref={passwordRef}
					placeholder="mind. 6 Zeichen!"
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
