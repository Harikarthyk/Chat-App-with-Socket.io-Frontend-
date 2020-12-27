import {useState, useEffect} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar";
import context from "./context/context";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import ChatRooms from "./components/ChatRooms/ChatRooms";
import Chat from "./components/Chat/Chat";
import io from "socket.io-client";

const CONNECTION_PORT = "https://chat-app--api.herokuapp.com/";

function App() {
	let initalUser = () => JSON.parse(localStorage.getItem("@chat_app_23-12"));
	const [user, setUser] = useState(initalUser);
	const [loading, setLoading] = useState(true);
	const [socket, setSocket] = useState(null);
	const [room, setRoom] = useState("");
	useEffect(() => {
		var color = "";
		color = "#";
		var letters = "0123456789ABCDEF";
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		if (user && user.user && user.user._id)
			setSocket(
				io(CONNECTION_PORT, {
					query: {
						userId: user.user._id,
						color: color,
						userName: user.user.name,
					},
				}),
			);
		return () =>
			socket
				? socket.on("disconnect", () => {
						setSocket(null);
				  })
				: "";
		//eslint-disable-next-line
	}, [CONNECTION_PORT]);
	useEffect(() => {
		let userExists = JSON.parse(localStorage.getItem("@chat_app_23-12"));
		if (userExists && userExists.user) setUser(userExists);

		setLoading(false);
	}, [setUser]);
	return (
		<BrowserRouter>
			<context.Provider
				value={{
					user,
					setUser,
					loading,
					setLoading,
					socket,
					setSocket,
					room,
					setRoom,
				}}
			>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/ChatRooms' component={ChatRooms} />
					<Route exact path='/room/*' component={Chat} />
				</Switch>
				<Footer />
			</context.Provider>
		</BrowserRouter>
	);
}

export default App;
