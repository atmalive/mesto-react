export function PopupWithForm({title, name, children, isOpen, handleClose}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && "popup_open"}`}>
            <div className="popup__container">
                <h3 className="popup__text">{title}</h3>
                <form className={`popup__inputs popup__inputs_type_${name}`} name={`submit${name}`} noValidate>
                    {children}
                    <button className="popup__button" type="submit">Сохранить</button>
                </form>
                <button className="popup__close-button" type="button" aria-label="close popup" onClick={handleClose}></button>
            </div>
        </div>
    )
}