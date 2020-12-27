import React, {useContext} from "react";
import {Link} from "react-router-dom";
import context from "../context/context";
import {FaSignOutAlt} from "react-icons/fa";
import "./Navbar.css";
import {logout} from "../helper/user";

function Navbar() {
	const {user, setUser} = useContext(context);
	const handleLogoutHandler = () => {
		logout()
			.then((result) => {
				console.log(result);
				if (result.error) {
					return;
				}
				setUser(null);
				localStorage.setItem("@chat_app_23-12", JSON.stringify(null));
			})
			.catch((error) => console.error(error));
	};
	return (
		<div className='Navbar'>
			<Link to='/'>
				<img
					className='Navbar__Image'
					src='https://user-images.githubusercontent.com/54505967/102970380-696c3780-451d-11eb-8a97-3bd03b41fd25.png'
					alt='Temporary Discord'
				/>
			</Link>
			<div className='Navbar__options'>
				{user ? (
					<div onClick={handleLogoutHandler} className='Navbar__option'>
						Logout <FaSignOutAlt style={{margin: "0px 3px"}} />
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
}

export default Navbar;
