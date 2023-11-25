import Home from "./Components/Home.js"
import Login from "./Components/Login.js"
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = `https://api-monkey-staking.0xanon.online/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div className="container">
			<Routes>
				<Route
					exact
					path="/"
					element={user ? <Home user={user} /> : <Navigate to="/login" />}
				/>
				<Route
					exact
					path="/login"
					element={user ? <Navigate to="/" /> : <Login />}
				/>
			</Routes>
		</div>
	);
}

export default App;
