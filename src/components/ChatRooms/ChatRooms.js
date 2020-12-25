import React, {useContext, useState} from "react";
import {FaPlus} from "react-icons/fa";
import {Redirect} from "react-router-dom";
import context from "../../context/context";
import Modal, {closeStyle} from "simple-react-modal";
import "./ChatRooms.css";
import {createChatRoom} from "../../helper/chatroom";
import Error from "../Error/Error";

function ChatRooms() {
	const {user} = useContext(context);
	const [input, setIntput] = useState({
		chatRoom: "",
	});
	const [output, setOutput] = useState({
		error: false,
		message: "",
	});
	const [showModel, setShowModel] = useState(false);
	const {chatRoom} = input;
	if (!user) return <Redirect to='/' />;
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
                setShowModel(false);
                
			})
			.catch((error) => console.error(error));
	};
	// const handleChatRoomListener = () => {};
	return (
		<>
			<div className='ChatRooms'>
				<div className='ChatRooms__createButton'>
					<button
						onClick={() => setShowModel(true)}
						className='ChatRooms__createButton__button'
					>
						Create Discord <FaPlus style={{marginLeft: "5px"}} />
					</button>
				</div>
			</div>
			<Modal
				show={showModel}
				closeOnOuterClick={true}
				onClose={() => setShowModel(false)}
				transitionSpeed={500}
			>
				<div style={closeStyle} onClick={() => setShowModel(false)}>
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
						placeholder='Rocky Baby !!'
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
		</>
	);
}

export default ChatRooms;
