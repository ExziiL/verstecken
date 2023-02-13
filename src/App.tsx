import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import PlayingScreen from './components/PlayingScreen/PlayingScreen';
import Signup from './components/Signup/Signup';
import PrivateRoute from './components/wrapper/PrivateRoute/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import { PlayerProvider } from './contexts/PlayerContext';

function App() {
	return (
		<div className="App">
			<Router>
				<AuthProvider>
					<GameProvider>
						<PlayerProvider>
							<Routes>
								<Route
									path="/"
									element={<PrivateRoute component={PlayingScreen} />}
								/>
								<Route
									path="/signup"
									element={<Signup />}
								/>
								<Route
									path="/login"
									element={<Login />}
								/>
							</Routes>
						</PlayerProvider>
					</GameProvider>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
