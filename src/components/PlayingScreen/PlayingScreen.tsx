import Navbar from '../globals/Navbar/Navbar';
import Players from '../Players/Players';
import CurrentUserInfo from './CurrentUserInfo/CurrentUserInfo';
import Map from './Map/Map';

const PlayingScreen = () => {
	return (
		<div>
			<Navbar />
			<Map />
			<CurrentUserInfo />
		</div>
	);
};

export default PlayingScreen;
