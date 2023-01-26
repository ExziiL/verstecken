import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import PlayingScreen from './components/PlayingScreen/PlayingScreen';
import Signup from './components/Signup/Signup';
import PrivateRoute from './components/wrapper/PrivateRoute/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
	return (
		<div className="App">
			<Router>
				<AuthProvider>
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
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
