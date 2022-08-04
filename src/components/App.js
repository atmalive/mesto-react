import React from 'react';
import {Header} from './Header'
import {Main} from './Main'
import {Footer} from './Footer'
import {ImagePopup} from "./ImagePopup";


export default function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState();

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
      <>
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
          {selectedCard && <ImagePopup card={selectedCard} onClose={closeAllPopups}/>}
      </div>
      </>
  );
}