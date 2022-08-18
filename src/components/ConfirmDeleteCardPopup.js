import {PopupWithForm} from "./PopupWithForm";

export function ConfirmDeleteCardPopup({ isOpen, isButtonBlocked, handleClose, handleDelete }) {

    const handleSubmit = (e) => {
        e.preventDefault()
        handleDelete()

    }

    return (
        <PopupWithForm title={'Вы уверены?'} name={'confirm'} isOpen={isOpen} isButtonBlocked={isButtonBlocked} handleClose={handleClose} onSubmit={handleSubmit} textButton={'Да'}>
        </PopupWithForm>
    )
}