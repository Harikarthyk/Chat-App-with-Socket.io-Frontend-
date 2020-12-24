import React, {useContext, useState} from "react";
import {FaArrowRight, FaPlus} from "react-icons/fa";
import {Redirect} from "react-router-dom";
import context from "../../context/context";
import "./ChatRooms.css";

function ChatRooms() {
	const {user} = useContext(context);
	const [input, setIntput] = useState({
		message: "",
	});
	const {message} = input;
	if (!user) return <Redirect to='/' />;
	return (
		<div className='ChatRooms'>
			<div className='ChatRooms__left'>
				<div
					className='ChatRooms__left__title'
					style={{
						background: "#ce1111",
						color: "white",
						fontWeight: "bolder",
					}}
				>
					Group 01
				</div>
				<div className='ChatRooms__left__title'>Group 02</div>
				<div className='ChatRooms__left__title'>Group 03</div>
				<button className='ChatRooms__left__button'>
					Create new Discord <FaPlus style={{marginLeft: "5px"}} />
				</button>
			</div>
			<div className='ChatRooms__right'>
				<div className='ChatRooms__right__title'>DISCORD NAME : Group 01</div>
				<div className='ChatRooms__right__contents'>
					<div className='ChatRooms__right__content'>
						<div className='ChatRooms__right__content__user'>user 01</div>
						<div className='ChatRooms__right__content__message'>
							Hey welcome to Temporary Discord
						</div>
						<div className='ChatRooms__right__content__date'>
							20-1-2020 5.45pm
						</div>
					</div>
					<div className='ChatRooms__right__content'>
						<div className='ChatRooms__right__content__user'>user 01</div>
						<div className='ChatRooms__right__content__message'>
							Hey welcome to Temporary Discord
						</div>
						<div className='ChatRooms__right__content__date'>
							20-1-2020 5.45pm
						</div>
					</div>
					<div className='ChatRooms__right__content'>
						<div className='ChatRooms__right__content__user'>user 01</div>
						<div className='ChatRooms__right__content__message'>
							Hey welcome to Temporary Discord
						</div>
						<div className='ChatRooms__right__content__date'>
							20-1-2020 5.45pm
						</div>
					</div>
				</div>
				<div className='ChatRooms__right__input'>
					<input
						value={message}
						onChange={(e) => setIntput({...input, message: e.target.value})}
						type='text'
						className='ChatRooms__right__input__field'
						placeholder='Type a message'
					/>
					<button className='ChatRooms__right__input__button'>
						<FaArrowRight />
					</button>
				</div>
			</div>
		</div>
	);
}

export default ChatRooms;
