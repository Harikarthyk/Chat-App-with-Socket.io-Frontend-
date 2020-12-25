import "./Chat.css";
import React, {useContext, useEffect, useState} from "react";
import context from "../../context/context";
import {Link, Redirect, useHistory} from "react-router-dom";
import {FaHome, FaArrowRight} from "react-icons/fa";

function Chat() {
	const {user, socket, setRoom} = useContext(context);
	const history = useHistory();
	const [roomName, setRoomName] = useState("");

	const [messages, setMessages] = useState([]);

	useEffect(() => {
		let temp = history.location.pathname.split("/");
		setRoomName(temp[2]);
		setRoom(temp[3]);

		// eslint-disable-next-line
	}, [history, socket]);

	const [message, setMessage] = useState("");
	// const handleMessageListener = () => {

	// }
	if (!user) return <Redirect to='/' />;
	return (
		<div className='Chat'>
			<Link
				onClick={() => {
					history.push("/");
					window.location.reload(false);
				}}
				className='Chat__back'
				to='/'
			>
				Back <FaHome style={{marginLeft: "10px"}} />
			</Link>
			<div className='Chat__title'>
				Discord Name <b>{roomName}</b>
			</div>
			<div className='Chat__messages'>
				<div className='Chat__messages__message'>
					<div className='Chat__messages__message__username'>Hari</div>
					<div className='Chat__message__message__msg'>Hey How are you</div>
					<div className='Chat__message__message__date'>
						12 - 02 - 2000 9:12pm
					</div>
				</div>
			</div>
			<div className='Chat__input'>
				<input
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className='Chat__input__field'
					type='text'
					placeholder='Type a message'
				/>
				<button className='Chat__input__button'>
					<FaArrowRight />
				</button>
			</div>
		</div>
	);
}

export default Chat;
