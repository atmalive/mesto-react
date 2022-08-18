import React, { useEffect, useState} from 'react'
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import {Header} from './Header'
import {Main} from './Main'
import {Footer} from './Footer'
import {ImagePopup} from "./ImagePopup";
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup";
import {ConfirmDeleteCardPopup} from "./ConfirmDeleteCardPopup";
// Ощибок нигде в консоли нет
export default function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser ] = useState();
    const [isButtonBlocked, setIsButtonBlocked] = useState(false);
    const [cards, setCards] = useState([]);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)

      useEffect( () => {
        api.getUserInfo()
            .then((userInfo) => {
                setCurrentUser(userInfo)
            })
            .catch(err => {
                console.log(err);
            });
        api.getInitialCards()
            .then((cardsItems) => {
                setCards(cardsItems)
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    const handleCardLike = (card) => {
        const isLiked = card.likes.some( card => card._id === currentUser._id)
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleCardDelete = () => {
        api.deleteCard(selectedCard._id)
            .then(() => {
                const newArr = cards.filter( (cardItem) => cardItem._id !== selectedCard._id)
                setCards(newArr)
                closeAllPopups()
            })
            .catch(err => {
                console.log(err);
            })
    }

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
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsButtonBlocked(false)
            })
    }

    const handleUpdateAvatar = ({avatar}) => {
        setIsButtonBlocked(true)
        api.updateAvatar(avatar)
            .then((data) => {
                setCurrentUser(data)
                closeAllPopups()
            })
            .catch(err => {
                console.log(err);
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
        setIsImagePopupOpen(false)
        setIsConfirmDeletePopupOpen(false)
    }

    const handleAddPlaceSubmit = (name, link) => {
        setIsButtonBlocked(true)
          api.addCard(name,link)
              .then((data) => {
                  setCards([data, ...cards]);
                  closeAllPopups()
              })
              .catch(err => {
                  console.log(err);
              })
              .finally(() => {
                  setIsButtonBlocked(false)
              })
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
              <Header />
              <Main
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace ={handleAddPlaceClick}
                  isEditProfilePopupOpen={isEditProfilePopupOpen}
                  isAddPlacePopupOpen={isAddPlacePopupOpen}
                  isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                  closeAllPopups={closeAllPopups}
                  handleCardClick={handleCardClick}
                  isConfirmDeletePopupOpen={isConfirmDeletePopupOpen}
                  setIsConfirmDeletePopupOpen={setIsConfirmDeletePopupOpen}
                  isImagePopupOpen={isImagePopupOpen}
                  setIsImagePopupOpen={setIsImagePopupOpen}
              />
              <Footer />
              <ImagePopup
                  card={selectedCard}
                  onClose={closeAllPopups}
                  isImagePopupOpen={isImagePopupOpen}
              />
              <EditProfilePopup isButtonBlocked={isButtonBlocked}
                                onUpdateUser={handleUpdateUser}
                                isOpen={isEditProfilePopupOpen}
                                handleClose={closeAllPopups}
              />
              <EditAvatarPopup isButtonBlocked={isButtonBlocked}
                               onUpdateAvatar={handleUpdateAvatar}
                               isOpen={isEditAvatarPopupOpen}
                               handleClose={closeAllPopups}
              />
              <AddPlacePopup  isButtonBlocked={isButtonBlocked}
                              onAddPlace={handleAddPlaceSubmit}
                              isOpen={isAddPlacePopupOpen}
                              handleClose={closeAllPopups}
              />
              <ConfirmDeleteCardPopup isButtonBlocked={isButtonBlocked}
                                      isOpen={isConfirmDeletePopupOpen}
                                      handleClose={closeAllPopups}
                                      handleDelete={handleCardDelete}
              />
          </div>
      </CurrentUserContext.Provider>
  );
}