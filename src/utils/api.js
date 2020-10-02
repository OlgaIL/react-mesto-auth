 class Api {
    constructor(apiData) {
        this.baseUrl = apiData.baseUrl;
		this.headers = apiData.headers; /** объект */
	}


	getInitialCards() {
		return fetch(`${this.baseUrl}cards`, {
			headers: this.headers
		})
			.then(res => {
			if (res.ok) {   return res.json(); 	}
			// если ошибка, отклоняем промис
			return Promise.reject(`Ошибка: ${res.status}`)
		});
		
	}

	getInitialUser() {
		return fetch(`${this.baseUrl}users/me`, {
			headers: this.headers
		})
			.then(res => {
			if (res.ok) {   return res.json(); 	}
			// если ошибка, отклоняем промис
			return Promise.reject(`Ошибка: ${res.status}`)
		});
		
	}

	putUserInfo(item) {
		return fetch(`${this.baseUrl}users/me`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify(item)
		}
		)
			.then(res => {
			if (res.ok) {   return res.json(); 	}
			// если ошибка, отклоняем промис
			return Promise.reject(`Ошибка: ${res.status}`)
		});
		
	}


	putAvatarInfo(avatar) {
		console.log(avatar);
		return fetch(`${this.baseUrl}users/me/avatar`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify(avatar)
		}	
		)
			.then(res => {
			if (res.ok) {   return res.json(); 	}
			// если ошибка, отклоняем промис
			return Promise.reject(`Ошибка: ${res.status}`)
		});
		
	}


	deleteCard (id) {
		return fetch(`${this.baseUrl}cards/${id}`, {
			method: 'DELETE',
			headers: this.headers
		})
		.then(res => {
			if (res.ok) {
				return res.json()
			}
		return Promise.reject(`Ошибка: ${res.status}`)
		})
	
	}
	
	createCard (item) { 
		return fetch(`${this.baseUrl}cards`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(item)
		})
		.then(res => res.json())
		}
	

	putLike (id) {
			return fetch(`${this.baseUrl}cards/likes/${id}`, {
				method: 'PUT',
				headers: this.headers
			})
			.then(res => {
				if (res.ok) {
					return res.json()
				}
			return Promise.reject(`Ошибка: ${res.status}`)
			})
		
		}

	deleteLike (id) {
			return fetch(`${this.baseUrl}cards/likes/${id}`, {
				method: 'DELETE',
				headers: this.headers
			})
			.then(res => {
				if (res.ok) {
					return res.json()
				}
			return Promise.reject(`Ошибка: ${res.status}`)
			})
		
		}

	changeLikeCardStatus(id, isLiked) {
		const res = isLiked ? this.putLike(id) : this.deleteLike(id);
		return res;
		}


}


const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/',
	headers: {
		authorization: 'b5b09145-9ffa-43dc-a8a7-afd53c9e00bd',
		'Content-Type': 'application/json'
	}
});


export default api;

