import React, {useContext, useState} from "react";
import {FaPlus} from "react-icons/fa";
import {Redirect, useHistory} from "react-router-dom";
import context from "../../context/context";
import Modal, {closeStyle} from "simple-react-modal";
import "./ChatRooms.css";
import Error from "../Error/Error";
import shortid from "shortid";

function ChatRooms() {
	const {user, setRoom, socket} = useContext(context);

	const [input, setIntput] = useState({
		chatRoom: "",
	});

	const {chatRoom} = input;

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
		setRoom(newId);
		if (socket === null) {
			setOutput({...output, message: "Try again in few seconds", error: true});
			return;
		}
		setShowCreateModel(false);
		setOutput({...output, message: "Done", error: false});
		socket.emit("create_room", {roomName: chatRoom, roomId: newId});
		history.push(`/room/${chatRoom}/${newId}`);
	};
	const handleJoinListener = () => {
		setRoom(chatRoom);
		if (socket === null) {
			setOutput({...output, message: "Try again in few seconds", error: true});
			return;
		}
		socket.emit("join_room", chatRoom);
		socket.on("error_message", (data) => {
			console.log(data);
			if (data.error) {
				setOutput({
					...output,
					message: "Error in finding the room",
					error: false,
				});

				return;
			}

			if (data.data) {
				history.push(`/room/${data.data}/${chatRoom}`);
			}
			return;
		});
		// if(socket)
		// setRoom(chatRoom);
	};

	if (!user) return <Redirect to='/' />;

	return (
		<>
			<div className='ChatRooms'>
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
