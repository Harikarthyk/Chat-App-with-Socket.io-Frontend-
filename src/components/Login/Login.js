import React, {useContext, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import context from "../../context/context";
import {login} from "../../helper/user";
import Error from "../Error/Error";
import "./Login.css";
function Login() {
	const [input, setInput] = useState({
		email: "",
		password: "",
	});
	const [output, setOutput] = useState({
		error: false,
		message: "",
	});
	const [loading, setLoading] = useState(false);
	const {error, message} = output;
	const {email, password} = input;
	const {setUser, user} = useContext(context);
	const handleSubmitListener = (e) => {
		e.preventDefault();
		setLoading(true);
		login(input)
			.then((result) => {
				if (result.error) {
					setLoading(false);
					setOutput({...output, error: true, message: result.error});
					return;
				}
				setOutput({...output, error: false, message: "Logged in successfully"});
				localStorage.setItem("@chat_app_23-12", JSON.stringify(result));
				setUser(result);
			})
			.catch((error) => console.error(error));
	};
	if (user !== null) {
		return <Redirect to='/' />;
	}
	return (
		<>
			<div className='Login'>
				<div className='Login__wrapper'>
					<form className='Login__left'>
						<div className='Login__title'>Login to Continue...</div>
						<div className='Login__left__field'>
							<div className='Login__left__field__label'>email :</div>
							<input
								type='email'
								required
								value={email}
								onChange={(e) => setInput({...input, email: e.target.value})}
								className='Login__left__field__input'
							/>
						</div>
						<div className='Login__left__field'>
							<div className='Login__left__field__label'>password :</div>
							<input
								type='password'
								required
								value={password}
								onChange={(e) => setInput({...input, password: e.target.value})}
								className='Login__left__field__input'
							/>
						</div>
						<button
							onClick={(e) => handleSubmitListener(e)}
							className='Login__left__form__button'
							type='submit'
						>
							Login
						</button>
						{loading ? "Loading..." : ""}
						<Error error={error} message={message} />
					</form>
					<div className='Login__right'>
						<div className='Login__right__label'>New user !👨🏼‍🎓</div>
						<Link className='Login__right__button' to='/register'>
							Create new account
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
