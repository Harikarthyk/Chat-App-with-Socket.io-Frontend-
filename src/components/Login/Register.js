import React, {useState} from "react";
import {Link} from "react-router-dom";
import {register} from "../../helper/user";
import Error from "../Error/Error";
import "./Login.css";
function Register() {
	const [input, setInput] = useState({
		name: "",
		email: "",
		password: "",
	});
	const {name, email, password} = input;
	const [output, setOutput] = useState({
		error: false,
		message: "",
	});
	const {error, message} = output;
	const [loading, setLoading] = useState(false);
	const handleSubmitListener = (e) => {
		e.preventDefault();
		setLoading(true);
		register(input).then((result) => {
			console.log(result);
			if (result.error) {
				setOutput({...output, error: true, message: result.error});
				setLoading(false);
				return;
			}
			setOutput({
				...output,
				error: false,
				message: `${result.message}, Login to continue...`,
			});
			setLoading(false);
		});
	};
	return (
		<div className='Login'>
			<div className='Login__wrapper'>
				<form className='Login__left'>
					<div className='Login__title'>Create your Account </div>
					<div className='Login__left__field'>
						<div className='Login__left__field__label'>Name :</div>
						<input
							type='text'
							required
							value={name}
							onChange={(e) => setInput({...input, name: e.target.value})}
							className='Login__left__field__input'
						/>
					</div>
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
						Create your account
					</button>
					{loading ? "Loading..." : ""}
					<Error error={error} message={message} />
				</form>
				<div className='Login__right'>
					<div className='Login__right__label'>Already an user 👨🏼‍🎓</div>
					<Link className='Login__right__button' to='/login'>
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Register;
