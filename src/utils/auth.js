import { setToken } from './token';
export const BASE_URL = 'https://auth.nomoreparties.co';

class Auth {
	constructor(apiData) {
        this.baseUrl = apiData.baseUrl;
		this.headers = apiData.headers;
	}

	_handleOriginalResponse = (res) => {
		if (!res.ok) {
			const errorMassage = {status: res.status};
			if(res.status === 400){
				errorMassage.statusText = 'некорректно заполнено одно из полей ';
			} else {
					errorMassage.statusText = res.statusText;
					console.log(res.status);
				};
			return Promise.reject(errorMassage);
		}
		return res.json();
	}


	register (password, email) {
		return fetch(`${BASE_URL}/signup`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({password, email})
			})
			.then(this._handleOriginalResponse);
	};

	authorize (password, email) {
		return fetch(`${BASE_URL}/signin`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({password, email})
		})
		.then((response => response.json()))
		.then((data) => {
			console.log(data);
			if (data.token){
					setToken (data.token);
					return data;
				} else {
					return;}
			})
	};

	getContent (token) {
		this.headers.Authorization =  `Bearer ${token}`;
		console.log(this.headers);
			return fetch(`${BASE_URL}/users/me`, {
			method: 'GET',
			headers: this.headers
			})
			.then((response => response.json()))
			.then(data => data);
	};
}

const userAuth = new Auth({
	baseUrl: 'https://auth.nomoreparties.co',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
});



export default userAuth;
