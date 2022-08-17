import {PopupWithForm} from "./PopupWithForm";
import React, {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export function EditProfilePopup({isOpen, handleClose, onUpdateUser, isButtonBlocked}) {
    const user = useContext(CurrentUserContext)
    const [ name, setName ] = React.useState('');
    const [ description , setDescription ] = React.useState('');

    React.useEffect(() => {
        if(user) {
        const { name: userName, about } = user;
        setName(userName);
        setDescription(about);
        }
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

   return(
           <PopupWithForm isButtonBlocked={isButtonBlocked} onSubmit={handleSubmit} title={'Редактировать профиль'} name={'info'} isOpen={isOpen} handleClose={handleClose}>
               <label className="popup__label">
                   <input
                       value={name}
                       onChange={ (e) => {
                           setName(e.target.value)
                       }}
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
                       value={description}
                       onChange={ (e) => {
                           setDescription(e.target.value)
                       }}
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
   )

}