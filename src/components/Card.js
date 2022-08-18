import React, {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export function Card({card, handleCardClick, onCardLike, isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen, setIsImagePopupOpen, isImagePopupOpen }) {
    const {name, link, likes} = card;
    const currentUserContext = useContext(CurrentUserContext)
    const { _id } = currentUserContext || {};
    const isOwn = card.owner._id === _id;
    const cardDeleteButtonClassName = (
        `element__trash ${!isOwn && 'element__trash_deactivate'} `
);
    const isLiked = likes.some(like => like._id === _id);
    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : ''}`
    );
    function handleClick() {
        handleCardClick(card);
        setIsImagePopupOpen(!isImagePopupOpen)
    }
    function handleLikeClick() {
        onCardLike(card);
    }
    function handleOpenConfirmPopup() {
        setIsConfirmDeletePopupOpen(!isConfirmDeletePopupOpen)
        handleCardClick(card)
    }

    return  (
        <div className="element">
            <button className={cardDeleteButtonClassName} aria-label="trash" type="button" onClick={handleOpenConfirmPopup}></button>
            <img src={link} alt={name} className="element__picture" onClick={handleClick} />
            <div className="element__text-like">
                <h2 className="element__text">{name}</h2>
                <div className="element__like-count">
                    <button className={cardLikeButtonClassName} aria-label="like" type="button" onClick={handleLikeClick}></button>
                    <p className="element__count">{likes.length}</p>
                </div>
            </div>
        </div>
    )
}