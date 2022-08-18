import React, { useContext } from 'react'
import {Card} from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export function Main(props) {
    const {onEditProfile,
        onAddPlace,
        onEditAvatar,
        handleCardClick,
        cards,
        onCardLike,
        onCardDelete,
        isConfirmDeletePopupOpen,
        setIsConfirmDeletePopupOpen,
        isImagePopupOpen,
        setIsImagePopupOpen
    } = props
    const currentUserContext = useContext(CurrentUserContext)
    const { about, name, avatar } = currentUserContext || {};

    return (
        <>
            <main className="main">
                <section className="profile">
                    <div onClick={onEditAvatar}
                         className="profile__avatar" style={{ backgroundImage: `url(${avatar})` }}/>
                    <div className="profile__info">
                        <h1 className="profile__title">{name}</h1>
                        <button onClick={onEditProfile}
                            className="profile__edit-button" type="button" aria-label="edit"></button>
                    </div>
                    <p className="profile__subtitle">{about}</p>
                    <button onClick={onAddPlace}
                            className="profile__add-button" aria-label="add picture" type="button"></button>
                </section>
                <section className="elements">
                    {cards.map( (card) => {
                          return <Card
                              setIsConfirmDeletePopupOpen={setIsConfirmDeletePopupOpen}
                              card={card}
                              isConfirmDeletePopupOpen={isConfirmDeletePopupOpen}
                              onCardDelete={onCardDelete}
                              onCardLike={onCardLike}
                              key={card._id}
                              handleCardClick={handleCardClick}
                              isImagePopupOpen={isImagePopupOpen}
                              setIsImagePopupOpen={setIsImagePopupOpen}
                          />
                    })}
                </section>
            </main>
        </>
    )
}