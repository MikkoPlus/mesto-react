import closeIcon from "../images/icons/close-icon.svg";

function ImagePopup({ isOpen, onClose, ...props }) {
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
      className={`popup popup_fullscreen-img ${isOpen ? "popup_active" : ""}`}
      id="open-image-popup"
    >
      <div className="popup__window popup__window_type_fullscreen-img">
        <img src={closeIcon} alt="Close" className="popup__close" />
        <img
          src={props.card.link || "#"}
          alt={props.card.name || "#"}
          className="popup__fullscreen-image"
        />
        <h3 className="popup__descr">{props.card.name || ""}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
