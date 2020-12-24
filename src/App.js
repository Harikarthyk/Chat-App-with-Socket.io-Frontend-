import {useState, useEffect} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar";
import context from "./context/context";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";

function App() {
	let initalUser = () => JSON.parse(localStorage.getItem("@chat_app_23-12"));
	const [user, setUser] = useState(initalUser);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		let userExists = JSON.parse(localStorage.getItem("@chat_app_23-12"));
		if (userExists && userExists.user) setUser(userExists);

		setLoading(false);
	}, [setUser]);
	return (
		<BrowserRouter>
			<context.Provider value={{user, setUser, loading, setLoading}}>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
				</Switch>
				<Footer />
			</context.Provider>
		</BrowserRouter>
	);
}

export default App;
