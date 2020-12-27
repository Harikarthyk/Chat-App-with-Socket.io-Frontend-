import React, {useContext} from "react";
import {Link, Redirect} from "react-router-dom";
import context from "../../context/context";
import "./Home.css";

function Home() {
	const {user} = useContext(context);
	if (user !== null) {
		return <Redirect to='/chatRooms' />;
	}
	return (
		<div className='Home'>
			<div className='Home__title'>Your place to talk</div>
			<div className='Home__content'>
				Temporary Discord where you can create a short-term community for
				instance purpose where you can text messages . Create your account and
				start your own Discord.
			</div>
			<div className='Home__buttons'>
				<Link to='/login' className='Home__button'>
					Login	
				</Link>
				<Link to='/register' className='Home__button'>
					New User
				</Link>
			</div>
		</div>
	);
}

export default Home;
