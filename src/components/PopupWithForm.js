export function PopupWithForm({title, name, children, isOpen, handleClose, onSubmit, isButtonBlocked, textButton = 'Сохранить'}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && "popup_open"}`}>
            <div className="popup__container">
                <h3 className="popup__text">{title}</h3>
                <form onSubmit={onSubmit} className={`popup__inputs popup__inputs_type_${name}`} name={`submit${name}`} noValidate>
                    {children}
                    <button disabled={isButtonBlocked} className={`popup__button ${isButtonBlocked && 'popup__button_inactive'}`} type="submit">{textButton}</button>
                </form>
                <button className="popup__close-button" type="button" aria-label="close popup" onClick={handleClose}></button>
            </div>
        </div>
    )
}