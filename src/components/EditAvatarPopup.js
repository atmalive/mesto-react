import {PopupWithForm} from "./PopupWithForm";
import React from "react";

export function EditAvatarPopup({ isButtonBlocked, isOpen, handleClose, onUpdateAvatar}) {

    const [ name, setName ] = React.useState('');
    const avatarRef = React.useRef("");

    const handleChange = (e) => {
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    // console.log(avatarRef.current.value)

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            isButtonBlocked={isButtonBlocked}
            title={'Обновить аватар'}
            name={'avatar'}
            isOpen={isOpen}
            handleClose={handleClose}
        >
            <label className="popup__label">
                <input
                    ref={avatarRef}
                    value={name}
                    onChange={handleChange}
                    className="popup__input popup__input_avatar popup__input_avatar_link"
                    name="submitAvatarLink"
                    placeholder="Ссылка на картинку"
                    type="url" required
                    id="input-avatar-link"/>
                <span className="popup__input-error input-avatar-link-error"></span>
            </label>
        </PopupWithForm>
    )
}