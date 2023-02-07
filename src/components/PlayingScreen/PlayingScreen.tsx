import { PlayerProvider } from '../../contexts/PlayerContext';
import Navbar from '../globals/Navbar/Navbar';
import CurrentUserInfo from './CurrentUserInfo/CurrentUserInfo';
import Map from './Map/Map';

const PlayingScreen = () => {
	return (
		<div>
			<PlayerProvider>
				<Navbar />
				<Map />
				<CurrentUserInfo />
			</PlayerProvider>
		</div>
	);
};

export default PlayingScreen;
