import { Link } from 'react-router-dom';
import RegistrierenCard from './RegistrierenCard';

// Registrieren zeigt den Registrier-Screen an, wenn der User noch keinen Account hat
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
