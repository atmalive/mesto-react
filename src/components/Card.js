import React from "react";

export function Card({card, handleCardClick}) {
    const {name, link, likes} = card;
    function handleClick() {
        handleCardClick(card);
    }
    return  (
        <div className="element">
            <button className="element__trash" aria-label="trash" type="button"></button>
            <img src={link} alt={name} className="element__picture" onClick={handleClick}/>
            <div className="element__text-like">
                <h2 className="element__text">{name}</h2>
                <div className="element__like-count">
                    <button className="element__like" aria-label="like" type="button"></button>
                    <p className="element__count">{likes.length}</p>
                </div>
            </div>
        </div>
    )

}