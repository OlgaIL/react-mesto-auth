import React, {useEffect} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import ImagePopup from './ImagePopup';
import api from '../utils/api';

import {CurrentUserContext} from '../context/CurrentUserContext';


function App() {
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState(null);
	const [currentUser, setCurrentUser] = React.useState(null);
	const [cards, setCards] = React.useState([]);

	const loadUserInfoandCards = async ()  => {
		try{
			const user = await api.getInitialUser();
			const data = await api.getInitialCards();
			setCurrentUser(user);
			setCards(data);
		} catch(error) { 
			console.log(error);
		} finally { 
			// loader false
		}
	}

	useEffect(() => {
		loadUserInfoandCards();
	}, []);


	function handleEditAvatarClick () {
		setIsEditAvatarPopupOpen(true);
	}

	function handleEditProfileClick () {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick () {
		setIsAddPlacePopupOpen(true);
	}

	function handleDeleteClick () {
		setIsDeletePopupOpen(true);
	}

	function handleCardClick (card) {
		setIsImagePopupOpen(true);
		setSelectedCard(card);
	}

	function closeAllPopups () {
				setIsEditProfilePopupOpen(false);
				setIsAddPlacePopupOpen(false);
				setIsEditAvatarPopupOpen(false);
				setIsDeletePopupOpen(false);
				setIsImagePopupOpen(false);
				setSelectedCard(null);
	}
	
	function handleCardLike (card) {
		// Снова проверяем, есть ли уже лайк на этой карточке
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		
		// Отправляем запрос в API и получаем обновлённые данные карточки
		api.changeLikeCardStatus(card._id, !isLiked)
		.then((newCard) => {
			// Формируем новый массив на основе имеющегося, подставляя в него новую карточку
		const newCards = cards.map((c) => c._id === card._id ? newCard : c);
		  // Обновляем стейт
		setCards(newCards);
		});
	}

	function handleCardDelete (card) {
			api.deleteCard(card._id)
			.then(() => {
				const newCards = cards.filter(c => c._id !== card._id);
				setCards(newCards);
			});
	}

	function handleUpdateUser (user) {
		api.putUserInfo(user)
		.then((res) => {
			setCurrentUser(res);
			setIsEditProfilePopupOpen(false)
		})
		.catch(err=>console.log(err));
		//.finally(() => setIsEditProfilePopupOpen(false));
	}

	function handleAddPlaceSubmit (card) {
		api.createCard(card)
		.then((newCard) => {
			setCards([newCard, ...cards]); 
			setIsAddPlacePopupOpen(false);
		})
		.catch(err=>console.log(err));
	}

	function handleUpdateAvatar (avatar) {
		api.putAvatarInfo(avatar)
		.then((res) =>{
			setCurrentUser(res);
			setIsEditAvatarPopupOpen(false)
		})
		.catch(err=>console.log(err));
	}


	return (
	<CurrentUserContext.Provider value={currentUser}>
		<div className="App">
			<div className="page">
				<Header />
						<Main
							onEditAvatar={handleEditAvatarClick}
							onEditProfile ={handleEditProfileClick}
							onAddPlace ={handleAddPlaceClick}
							onCardClick={handleCardClick}
							onDeleteImg = {handleDeleteClick} 
							cards = {cards}
							onCardLike ={handleCardLike}
							onCardDelete ={handleCardDelete} />
				<Footer />
			</div>

				<EditProfilePopup  onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
				<AddPlacePopup  onAddPlace ={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
				<EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

				<PopupWithForm 
							name ="delete"
							title = "Вы уверены?"
							submitText = "Да"
							isOpen = {isDeletePopupOpen}
							onClose = {closeAllPopups} />

				<ImagePopup 
						isOpen = {isImagePopupOpen}
						onClose = {closeAllPopups}
						card = {selectedCard} />

		</div>
	</CurrentUserContext.Provider>
	);
}

export default App;
