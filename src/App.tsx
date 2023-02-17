import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import PlayingScreen from './components/PlayingScreen/PlayingScreen';
import Registrieren from './components/Registrieren/Registrieren';
import PrivateRoute from './components/wrapper/PrivateRoute/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { GameBoundingBoxProvider } from './contexts/GameBoundingBoxContext';
import { GameProvider } from './contexts/GameContext';
import { PlayerProvider } from './contexts/PlayerContext';

function App() {
	return (
		<div className="App">
			<Router>
				<AuthProvider>
					<GameProvider>
						<GameBoundingBoxProvider>
							<PlayerProvider>
								<Routes>
									<Route
										path="/"
										element={<PrivateRoute component={PlayingScreen} />}
									/>
									<Route
										path="/signup"
										element={<Registrieren />}
									/>
									<Route
										path="/login"
										element={<Login />}
									/>
								</Routes>
							</PlayerProvider>
						</GameBoundingBoxProvider>
					</GameProvider>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
