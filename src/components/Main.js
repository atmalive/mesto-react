import React from 'react';
import {PopupWithForm} from './PopupWithForm';
import {api} from '../utils/Api';
import {Card} from "./Card";

export function Main(props) {
    const {onEditProfile,
        onAddPlace,
        onEditAvatar,
        isEditProfilePopupOpen,
        isAddPlacePopupOpen,
        isEditAvatarPopupOpen,
        closeAllPopups,
        handleCardClick} = props

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect( () => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cardsItems]) => {
                const {name, about, avatar, _id} = userData;
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
                          return <Card card={card} handleCardClick={handleCardClick}/>
                    })}

                </section>
            </main>

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
        </>
    )
}