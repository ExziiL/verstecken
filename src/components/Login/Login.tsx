import { Link } from 'react-router-dom';
import LoginCard from './LoginCard';

function Login() {
	return (
		<div className="p-4">
			<LoginCard />
			<div>
				Möchtest du dich anmelden? <Link to="/signup">Hier Registrieren</Link>
			</div>
		</div>
	);
}

export default Login;
