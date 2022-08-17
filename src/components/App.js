import React, {useEffect, useState} from 'react'
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import {api} from "../utils/Api";
import {Header} from './Header'
import {Main} from './Main'
import {Footer} from './Footer'
import {ImagePopup} from "./ImagePopup";
import {PopupWithForm} from "./PopupWithForm";
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";

export default function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser ] = useState();
    const [isButtonBlocked, setIsButtonBlocked] = useState(false);

    useEffect( () => {
        api.getUserInfo()
            .then((userInfo) => {
                setCurrentUser(userInfo)
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

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

    const handleUpdateUser = ({name, about}) => {
        setIsButtonBlocked(true)
        api.updateUserInfo(name, about)
        .then((data) => {
            setCurrentUser(data)
            closeAllPopups()
        })
            .finally(() => {
                setIsButtonBlocked(false)
            })
    }

    const handleUpdateAvatar = ({avatar}) => {
        console.log(avatar)
        setIsButtonBlocked(true)
        api.updateAvatar(avatar)
            .then((data) => {
                setCurrentUser(data)
                closeAllPopups()
            })
            .finally(() => {
                setIsButtonBlocked(false)
            })
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setSelectedCard(null)
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
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
              <EditProfilePopup isButtonBlocked={isButtonBlocked} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} handleClose={closeAllPopups}/>
              <EditAvatarPopup isButtonBlocked={isButtonBlocked} onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} handleClose={closeAllPopups} />


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



          </div>
      </CurrentUserContext.Provider>

  );
}