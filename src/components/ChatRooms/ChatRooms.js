import React, {useContext, useEffect, useState} from "react";
import {FaPlus} from "react-icons/fa";
import {Link, Redirect, useHistory} from "react-router-dom";
import context from "../../context/context";
import Modal, {closeStyle} from "simple-react-modal";
import "./ChatRooms.css";
import {createChatRoom, allRooms} from "../../helper/chatroom";
import Error from "../Error/Error";

function ChatRooms() {
	const {user, setRoom} = useContext(context);
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
				setOutput({...output, message: "Created new Discord", error: false});
			})
			.catch((error) => console.error(error));
	};

	const handleJoinListener = () => {
		//
	};

	useEffect(() => {
		allRooms(user.token, user.user._id).then((result) => {
			if (result.error) {
				return;
			}
			console.log(result);
			setRooms(result.rooms);
		});
	}, [user, history, output]);

	if (!user) return <Redirect to='/' />;

	return (
		<>
			<div className='ChatRooms'>
				<div className='ChatRooms__preTitle'>Your Discord's</div>
				<div className='ChatRooms_AllChatRooms'>
					{rooms.map((chat_room) => {
						return (
							<Link
								to={`/room/${chat_room.roomName}/${chat_room._id}`}
								key={chat_room._id}
								className='ChatRooms__AllChatRooms__rooms'
							>
								{chat_room.roomName}
							</Link>
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
