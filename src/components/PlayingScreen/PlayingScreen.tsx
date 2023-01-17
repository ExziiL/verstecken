import Navbar from '../globals/Navbar/Navbar';
import CurrentUserInfo from './CurrentUserInfo/CurrentUserInfo';
import Map from './Map/Map';
import Players from './Players/Players';

const PlayingScreen = () => {
	return (
		<div>
			<Navbar />
			<Map />
			<CurrentUserInfo />
			<Players />
		</div>
	);
};

export default PlayingScreen;
