import "./Chat.css";
import React, {useContext, useEffect, useState} from "react";
import context from "../../context/context";
import {Link, Redirect, useHistory} from "react-router-dom";
import {FaHome, FaArrowRight, FaCopy} from "react-icons/fa";

function Chat() {
	const {user, socket, room, setRoom} = useContext(context);
	const history = useHistory();
	const [showCopied, setShowCopied] = useState(false);
	const [message, setMessage] = useState("");
	const [userColor, setUserColor] = useState("");

	const [roomName, setRoomName] = useState("");

	const [messageList, setMessageList] = useState([]);

	useEffect(() => {
		let temp = history.location.pathname.split("/");
		setRoomName(temp[2]);
		setRoom(temp[3]);

		// eslint-disable-next-line
	}, [history, socket]);

	useEffect(() => {
		if (socket)
			socket.on("receive_message", (data) => {
				console.log(data);
				setMessageList([...messageList, data]);
			});
	});

	const sendMessage = () => {
		var d = new Date();

		let messageContent = {
			chatroom: room,
			content: {
				user_id: user.user._id,
				user_name: user.user.name,
				message: message,
				date: `${d.getHours()} : ${d.getMinutes()} `,
			},
		};

		socket.emit("send_message", messageContent);
		setMessageList([...messageList, messageContent.content]);
		setMessage("");
	};
	useEffect(() => {
		var color = "";
		while (color !== "#f9f9f9") {
			color = "#";
			var letters = "0123456789ABCDEF";
			for (var i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
		}
		setUserColor(color);
	}, []);
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
			<div className='Chat__code'>
				Invite Code : <b>{room}</b>{" "}
				<FaCopy
					onClick={() => {
						var textField = document.createElement("textarea");
						textField.innerText = room;
						document.body.appendChild(textField);
						textField.select();
						document.execCommand("copy");
						textField.remove();
						setShowCopied(true);
					}}
					style={{marginLeft: "10px", cursor: "pointer"}}
				/>
				{showCopied ? <div className='Chat__code__copied'>copied </div> : ""}
			</div>
			<div className='Chat__messages'>
				{messageList.map((m, index) => {
					return (
						<div className='Chat__messages__message' key={index}>
							<div
								style={{color: userColor}}
								className='Chat__messages__message__username'
							>
								{m.user_name}
							</div>
							<div className='Chat__message__message__msg'>{m.message}</div>
							<div className='Chat__message__message__date'>{m.date}</div>
						</div>
					);
				})}
			</div>
			<div className='Chat__input'>
				<input
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className='Chat__input__field'
					type='text'
					placeholder='Type a message'
				/>
				<button onClick={sendMessage} className='Chat__input__button'>
					<FaArrowRight />
				</button>
			</div>
		</div>
	);
}

export default Chat;
