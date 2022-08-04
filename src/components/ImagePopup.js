export function ImagePopup({card, onClose}) {
    const {name, link} = card;
    return (
        <div className={`popup popup_type_img ${card && "popup_open"}`}>
            <figure className="popup__figure">
                <img src={link} alt={name} className="popup__img"/>
                <figcaption className="popup__subtitle">{name}</figcaption>
                <button
                    onClick={onClose}
                    className="popup__close-button popup__close-button_figure"
                    type="button"
                    aria-label="close popup">
                </button>
            </figure>
        </div>
    )
}