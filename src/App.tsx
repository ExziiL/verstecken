import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import PlayingScreen from './components/PlayingScreen/PlayingScreen';
import Signup from './components/Signup/Signup';

function App() {
	return (
		<div className="App">
			<Router>
				<AuthProvider>
					<Routes>
						<Route
							path="/"
							element={<PlayingScreen />}
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
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
