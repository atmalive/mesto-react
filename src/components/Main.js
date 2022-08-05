import React, { useState, useEffect } from 'react'
import {api} from '../utils/Api';
import {Card} from "./Card";

export function Main(props) {
    const {onEditProfile,
        onAddPlace,
        onEditAvatar,
        handleCardClick} = props

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect( () => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cardsItems]) => {
                const {name, about, avatar} = userData;
                setUserName(name)
                setUserDescription(about)
                setUserAvatar(avatar)
                setCards(cardsItems)
            })
            .catch(err => {
                console.log(err);
            });


    }, [])

    return (
        <>
            <main className="main">
                <section className="profile">
                    <div onClick={onEditAvatar}
                         className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}/>
                    <div className="profile__info">
                        <h1 className="profile__title">{userName}</h1>
                        <button onClick={onEditProfile}
                            className="profile__edit-button" type="button" aria-label="edit"></button>
                    </div>
                    <p className="profile__subtitle">{userDescription}</p>
                    <button onClick={onAddPlace}
                            className="profile__add-button" aria-label="add picture" type="button"></button>
                </section>
                <section className="elements">
                    {cards.map( (card) => {
                        console.log(card)
                          return <Card key={card._id} card={card} handleCardClick={handleCardClick}/>
                    })}

                </section>
            </main>
        </>
    )
}