import React, { useState } from 'react';
import Form from './Form';


import { useHistory } from 'react-router-dom';
import {CurrentUserContext} from '../context/CurrentUserContext';

import { setToken } from '../utils/token';
import  userAuth from '../utils/auth';


function Login (props) {
	const currentUser = React.useContext(CurrentUserContext); // подписываем на контекст
	//console.log(currentUser);

	const [inputValue , setInputValue] = React.useState({
			email: '',
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

	function handleSubmit (e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
		// Передаём значения управляемых компонентов во внешний обработчик
		const { email, password } = inputValue;
		if (!email || !password){
			return;
		}
	
		//props.onAddPlace(inputValue);

		userAuth.authorize(password, email)
		.then((data) => {
			if (!data){
			setMessage('Что-то пошло не так!')
			// вызвать инфо окно
			}
	
		if (data.jwt) {
			setToken(data.jwt);
			setInputValue({ email: '', password: ''});
			setMessage('');
					console.log(data.user);
			props.handleLogin(data.user);
			history.push('/cards');
		}
	})
		.catch(err => console.log(err));

		
		setTimeout(() =>{
			setInputValue({
				name:'',
				link:''
			});
		}, 3000);
		


	}


	return (
		<main className="content__form">


	 <p className="login__error">
       {message}
    </p>


		<Form 
			name = "login"
			title = "Вход"
			submitText = "Войти"
			isOpen = {props.isOpen}
			onSubmit={handleSubmit}
			>
						<input type="email" value={inputValue.email}  className="form__edt-text form__edt-text_theme_dark" name="email" placeholder="E-mail" required minLength="1" maxLength="30" onChange={handleChange} />
						<span id="name-error" className="form__error"></span>
						<input value={inputValue.password}  className="form__edt-text  form__edt-text_theme_dark" name="password" placeholder="Ваш пароль" required type="password" onChange={handleChange} />
						<span id="pwd-error" className="form__error"></span>
		</Form> 
	
		</main>
	);
}

export default Login;
