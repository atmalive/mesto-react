import React from 'react';
import {Header} from './Header'
import {Main} from './Main'
import {Footer} from './Footer'
import {ImagePopup} from "./ImagePopup";
import {PopupWithForm} from "./PopupWithForm";


export default function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true)
    }
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true)
    }
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true)
    }
    const handleCardClick = (card) => {
        setSelectedCard(card)
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setSelectedCard(null)
    }

  return (
      <div className="page">
              <Header />
              <Main
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace ={handleAddPlaceClick}
                  isEditProfilePopupOpen={isEditProfilePopupOpen}
                  isAddPlacePopupOpen={isAddPlacePopupOpen}
                  isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                  closeAllPopups={closeAllPopups}
                  handleCardClick={handleCardClick}
              />
              <Footer />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <PopupWithForm title={'Редактировать профиль'} name={'info'} isOpen={isEditProfilePopupOpen} handleClose={closeAllPopups}>
              <label className="popup__label">
                  <input
                      className="popup__input popup__input_type_name"
                      name="submitPopupName"
                      placeholder="Имя"
                      type="text" required
                      minLength="2"
                      maxLength="40"
                      id="input-profile-name"/>
                  <span className="popup__input-error input-profile-name-error"></span>
              </label>
              <label className="popup__label">
                  <input
                      className="popup__input popup__input_type_job"
                      name="submitPopupJob"
                      placeholder="Занятие"
                      type="text" required
                      minLength="2"
                      maxLength="200"
                      id="input-profile-description"/>
                  <span className="popup__input-error input-profile-description-error"></span>
              </label>
          </PopupWithForm>

          <PopupWithForm title={'Новое место'} name={'card'} isOpen={isAddPlacePopupOpen} handleClose={closeAllPopups}>
              <label className="popup__label">
                  <input
                      className="popup__input popup__input_mesto popup__input_mesto_name"
                      name="submitCardName"
                      placeholder="Название"
                      type="text" required
                      minLength="2"
                      maxLength="30"
                      id="input-mesto-name"/>
                  <span className="popup__input-error input-mesto-name-error"></span>
              </label>
              <label className="popup__label">
                  <input
                      className="popup__input popup__input_mesto popup__input_mesto_link"
                      name="submitCardLink"
                      placeholder="Ссылка на картинку"
                      type="url" required
                      id="input-mesto-link"/>
                  <span className="popup__input-error input-mesto-link-error"></span>
              </label>
          </PopupWithForm>

          <PopupWithForm title={'Обновить аватар'} name={'avatar'} isOpen={isEditAvatarPopupOpen} handleClose={closeAllPopups}>
              <label className="popup__label">
                  <input
                      className="popup__input popup__input_avatar popup__input_avatar_link"
                      name="submitAvatarLink"
                      placeholder="Ссылка на картинку"
                      type="url" required
                      id="input-avatar-link"/>
                  <span className="popup__input-error input-avatar-link-error"></span>
              </label>
          </PopupWithForm>
      </div>
  );
}