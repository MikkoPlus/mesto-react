import closeIcon from "../images/icons/close-icon.svg";

function PopupWithForm({ name, title, btnText, children, isOpen, onClose, onSubmit }) {
  function closePopup(evt) {
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup_active")
    ) {
      onClose();
    }
  }

  return (
    <div
      onClick={closePopup}
      className={`popup popup_type_${name} ${isOpen ? "popup_active" : ""}`}
    >
      <div className="popup__window popup__window_type_form">
        <img src={closeIcon} alt="Close" className="popup__close" />
        <h4 className="popup__title">{title}</h4>
        <form className="form" id={`${name}-form`} name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__button form__btn">
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
