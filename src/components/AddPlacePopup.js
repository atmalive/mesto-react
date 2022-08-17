import {PopupWithForm} from "./PopupWithForm";
import React from "react";

export function AddPlacePopup({ isOpen, onAddPlace, handleClose, isButtonBlocked}) {

    const [ name, setName ] = React.useState('')
    const [ link, setLink ] = React.useState('')

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace(
            name,
            link
        );
    }

    return (
        <PopupWithForm title={'Новое место'} name={'card'} isOpen={isOpen} onSubmit={handleSubmit} handleClose={handleClose} isButtonBlocked={isButtonBlocked}>
            <label className="popup__label">
                <input
                    value={name}
                    onChange={ (e) => {
                        setName(e.target.value)
                    }}
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
                    value={link}
                    onChange={ (e) => {
                        setLink(e.target.value)
                    }}
                    className="popup__input popup__input_mesto popup__input_mesto_link"
                    name="submitCardLink"
                    placeholder="Ссылка на картинку"
                    type="url" required
                    id="input-mesto-link"/>
                <span className="popup__input-error input-mesto-link-error"></span>
            </label>
        </PopupWithForm>
    )
}