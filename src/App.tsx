import { AuthProvider } from '../src/context/AuthContext';
import './App.css';
import Login from './components/Login/Login';
import Map from './components/Map/Map';
import Signup from './components/Signup/Signup';

function App() {
	return (
		<AuthProvider>
			<div className="App">
				{/* <h1>Hello World</h1> */}
				{/* <Login /> */}
				<Map />
				<Signup />
			</div>
		</AuthProvider>
	);
}

export default App;
