import StartGame from '../GameHandling/StartGame';
import Navbar from '../globals/Navbar/Navbar';
import CurrentUserInfo from './CurrentUserInfo/CurrentUserInfo';
import Map from './Map/Map';

const PlayingScreen = () => {
	return (
		<div>
			<Navbar />
			<Map />
			<StartGame />
			<CurrentUserInfo />
		</div>
	);
};

export default PlayingScreen;
