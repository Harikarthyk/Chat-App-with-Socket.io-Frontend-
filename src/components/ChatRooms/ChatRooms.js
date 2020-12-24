import React, {useContext, useState} from "react";
import {FaArrowRight, FaPlus} from "react-icons/fa";
import {Redirect} from "react-router-dom";
import context from "../../context/context";
import Modal, {closeStyle} from "simple-react-modal";
import "./ChatRooms.css";
import {createChatRoom} from "../../helper/chatroom";
import Error from "../Error/Error";

function ChatRooms() {
	const {user} = useContext(context);
	const [input, setIntput] = useState({
		message: "",
		chatRoom: "",
	});
	const [output, setOutput] = useState({
		error: false,
		message: "",
	});
	const [showModel, setShowModel] = useState(false);
	const {message, chatRoom} = input;
	if (!user) return <Redirect to='/' />;
	const handleChatNameListener = () => {
		createChatRoom({roomName: chatRoom}, user.token, user.user._id)
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
					<button
						onClick={() => setShowModel(true)}
						className='ChatRooms__left__button'
					>
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
