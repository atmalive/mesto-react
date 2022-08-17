import React, { useState, useEffect, useContext } from 'react'
import {api} from '../utils/Api';
import {Card} from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export function Main(props) {
    const {onEditProfile,
        onAddPlace,
        onEditAvatar,
        handleCardClick} = props

    const currentUserContext = useContext(CurrentUserContext)
    const { about, name, avatar, _id } = currentUserContext || {};
    const [cards, setCards] = useState([]);

    useEffect( () => {
        api.getInitialCards()
            .then((cardsItems) => {
                setCards(cardsItems)
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    const handleCardLike = (card) => {
        const isLiked = card.likes.some( card => card._id === _id)

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            });
    }

    const handleCardDelete = (card) => {
        console.log(card)
        api.deleteCard(card._id)
            .then(() => {
                const newArr = cards.filter( (cardItem) => cardItem._id !== card._id)
                setCards(newArr)
            })
    }

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
                          return <Card onCardDelete={handleCardDelete} onCardLike={handleCardLike} key={card._id} card={card} handleCardClick={handleCardClick}/>
                    })}
                </section>
            </main>
        </>
    )
}