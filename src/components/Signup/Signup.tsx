import { Link } from 'react-router-dom';
import SignupCard from './SignupCard';

function Signup() {
	return (
		<div className="p-4">
			<SignupCard />
			<div>
				Hast du bereits einen Account? <Link to="/login">Hier Anmelden</Link>
			</div>
		</div>
	);
}

export default Signup;
