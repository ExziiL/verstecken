import { Link } from 'react-router-dom';
import LoginCard from './LoginCard';

function Login() {
	return (
		<div className="p-4">
			<LoginCard />
			<div>
				Bitte erst registrieren.{' '}
				<Link
					to="/signup"
					className="font-bold underline"
				>
					Hier Registrieren
				</Link>
			</div>
		</div>
	);
}

export default Login;
