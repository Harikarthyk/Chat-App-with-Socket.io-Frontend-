import React, {useContext, useEffect, useState} from "react";
import {FaPlus} from "react-icons/fa";
import {Redirect, useHistory} from "react-router-dom";
import context from "../../context/context";
import Modal, {closeStyle} from "simple-react-modal";
import "./ChatRooms.css";
import {createChatRoom, allRooms, getChatRoomById} from "../../helper/chatroom";
import Error from "../Error/Error";
import shortid from "shortid";

function ChatRooms() {
	const {user, setRoom, socket} = useContext(context);
	const [input, setIntput] = useState({
		chatRoom: "",
	});

	const {chatRoom} = input;

	const [rooms, setRooms] = useState([]);
	const [output, setOutput] = useState({
		error: false,
		message: "",
	});

	const history = useHistory();

	const [showCreateModel, setShowCreateModel] = useState(false);
	const [showJoinModel, setShowJoinModel] = useState(false);

	const handleChatNameListener = () => {
		let newId = shortid.generate();
		console.log(newId);
		createChatRoom(
			{roomName: chatRoom, allUsers: [{user: user.user._id}]},

			user.token,
			user.user._id,
		)
			.then((result) => {
				if (result.error) {
					setOutput({...output, message: result.error, error: true});
					return;
				}
				setShowCreateModel(false);
				setRoom(chatRoom);
				while (socket === null);
				socket.emit("join_room", chatRoom);
				setOutput({...output, message: "Created new Discord", error: false});
				history.push(`/room/${chatRoom}/${newId}`);
			})
			.catch((error) => console.error(error));
	};

	const handleJoinListener = () => {
		getChatRoomById(chatRoom, user.token, user.user._id)
			.then((result) => {
				if (result.error) {
					setOutput({...output, message: result.error, error: true});
					console.log(result);
					return;
				}
				console.log(result);
				setRoom(chatRoom);
				socket.emit("join_room", chatRoom);
				history.push(`/room/${result.room.roomName}/${chatRoom}`);
			})
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		allRooms(user.token, user.user._id).then((result) => {
			if (result.error) {
				return;
			}
			setRooms(result.rooms);
		});
	}, [user, history, output]);

	if (!user) return <Redirect to='/' />;

	return (
		<>
			<div className='ChatRooms'>
				<div className='ChatRooms__preTitle'>Discord's you created </div>
				<div className='ChatRooms_AllChatRooms'>
					{rooms.map((chat_room) => {
						return (
							<div
								onClick={() => {
									setIntput({...input, chatRoom: chat_room._id});
									handleJoinListener();
								}}
								key={chat_room._id}
								className='ChatRooms__AllChatRooms__rooms'
							>
								{chat_room.roomName}
							</div>
						);
					})}
				</div>
				<div className='ChatRooms__createButton'>
					<button
						onClick={() => setShowCreateModel(true)}
						className='ChatRooms__createButton__button'
					>
						Create Discord <FaPlus style={{marginLeft: "5px"}} />
					</button>
				</div>
				<div className='ChatRooms__createButton'>
					<button
						onClick={() => setShowJoinModel(true)}
						className='ChatRooms__createButton__button'
					>
						Join Discord <FaPlus style={{marginLeft: "5px"}} />
					</button>
				</div>
			</div>
			<Modal
				show={showCreateModel}
				closeOnOuterClick={true}
				onClose={() => setShowCreateModel(false)}
				transitionSpeed={500}
			>
				<div style={closeStyle} onClick={() => setShowCreateModel(false)}>
					x
				</div>
				<div className='ChatRooms__model'>
					<div className='ChatRooms__model__title'>
						Enter the DISCORD Name :
					</div>
					<input
						value={chatRoom}
						onChange={(e) => setIntput({...input, chatRoom: e.target.value})}
						type='text'
						placeholder='Eg. Rocky Baby !!'
						className='ChatRooms__model__input'
					/>
					<button
						className='ChatRooms__model__button'
						onClick={handleChatNameListener}
					>
						Create !
					</button>
					<Error error={output.error} message={output.message} />
				</div>
			</Modal>
			<Modal
				show={showJoinModel}
				closeOnOuterClick={true}
				onClose={() => setShowJoinModel(false)}
				transitionSpeed={500}
			>
				<div style={closeStyle} onClick={() => setShowJoinModel(false)}>
					x
				</div>
				<div className='ChatRooms__model'>
					<div className='ChatRooms__model__title'>Enter the DISCORD Id :</div>
					<input
						value={chatRoom}
						onChange={(e) => setIntput({...input, chatRoom: e.target.value})}
						type='text'
						placeholder='Eg. 1234dfses121'
						className='ChatRooms__model__input'
					/>
					<button
						className='ChatRooms__model__button'
						onClick={handleJoinListener}
					>
						Join
					</button>
					<Error error={output.error} message={output.message} />
				</div>
			</Modal>
		</>
	);
}

export default ChatRooms;
