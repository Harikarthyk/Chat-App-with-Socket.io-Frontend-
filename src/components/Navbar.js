import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";

function Navbar() {
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
				<Link to='/about' className='Navbar__option'>
					About
				</Link>
				<Link to='/safety' className='Navbar__option'>
					Safety
				</Link>
			</div>
		</div>
	);
}

export default Navbar;
