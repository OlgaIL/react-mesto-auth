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
					if (data.user){
						setToken(data.jwt);
						return data;
					} else {
						return;
					}
				})
			.catch(err => console.log(err))
	};

	getContent (token) {
		this.headers.Authorization =  `Bearer ${token}`;
			return fetch(`${BASE_URL}/users/me`, {
			method: 'GET',
			headers: this.headers
			})
			.then(this._handleOriginalResponse);
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
