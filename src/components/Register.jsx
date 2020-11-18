import React, { useState } from 'react';
import Form from './Form';


import { useHistory } from 'react-router-dom';
import {CurrentUserContext} from '../context/CurrentUserContext';


function Register (props) {
	const currentUser = React.useContext(CurrentUserContext); // подписываем на контекст
	//console.log(currentUser);

	const [inputValue , setInputValue] = React.useState({
			username: '',
			password: ''
		});

	const [message, setMessage] = useState('');
	const history = useHistory();

	function handleChange (event) {
		const {name, value} = event.target;
		setInputValue({
			...inputValue,
			[name]: value,
		});
	}


	const handleSubmit = (e) => {
		e.preventDefault();
		const { username, password } = inputValue;
		if (!username || !password){
			return;
		}
		props.onRegister(password, username);
	}


	return (
	<main className="content__form">
		<Form 
			name = "registration"
			title = "Регистрация"
			submitText = "Зарегистрироваться"
			onSubmit={handleSubmit} >
						<input type="email" value={inputValue.username}  className="form__edt-text form__edt-text_theme_dark" name="username" placeholder="E-mail" required minLength="1" maxLength="30" onChange={handleChange} />
						<span id="name-error" className="form__error"></span>
						<input value={inputValue.password}  className="form__edt-text  form__edt-text_theme_dark" name="password" placeholder="Ваш пароль" required type="password" onChange={handleChange} />
						<span id="pwd-error" className="form__error"></span>
		</Form>
	</main>
	);
}

export default Register;

