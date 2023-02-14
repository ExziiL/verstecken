import { Link } from 'react-router-dom';
import RegistrierenCard from './RegistrierenCard';

function Registrieren() {
	return (
		<div className="p-4">
			<RegistrierenCard />
			<div>
				Hast du bereits einen Account? <Link to="/login">Hier Anmelden</Link>
			</div>
		</div>
	);
}

export default Registrieren;
