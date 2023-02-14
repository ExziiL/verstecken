import StartGame from '../GameHandling/StartGame';
import Navbar from '../globals/Navbar/Navbar';
import CurrentUserInfo from './CurrentUserInfo/CurrentUserInfo';
import Map from './Map/Map';
import PlayerName from './PlayerName';

const PlayingScreen = () => {
	return (
		<div>
			<Navbar />
			{/* <PlayerName /> */}
			<Map />
			<StartGame />
			<CurrentUserInfo />
		</div>
	);
};

export default PlayingScreen;
