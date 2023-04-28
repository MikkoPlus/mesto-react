import closeIcon from "../../images/icons/close-icon.svg";
import { useRef, useEffect, useState } from "react";
function PopupWithForm({
  name,
  title,
  btnText,
  children,
  isOpen,
  onClose,
  onSubmit,
  noValidate,
  inputNames,
  inputValues,
}) {
  function closePopup(evt) {
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup_active")
    ) {
      onClose();
    }
  }
  const [isFormValid, setIsFormValid] = useState(false);

  const formRef = useRef();

  function checkInputValidity(inputName) {
    return formRef.current.elements[inputName].validity.valid;
  }

  useEffect(
    () => {
      if (inputNames) {
        setIsFormValid(
          inputNames.every((inputName) => checkInputValidity(inputName))
        );
      } else {
        setIsFormValid(true);
      }
    },
    // eslint-disable-next-line
    inputValues ? [...inputValues] : []
  );

  return (
    <div
      onClick={closePopup}
      className={`popup popup_type_${name} ${isOpen ? "popup_active" : ""}`}
    >
      <div className="popup__window popup__window_type_form">
        <img src={closeIcon} alt="Close" className="popup__close" />
        <h4 className="popup__title">{title}</h4>
        <form
          ref={formRef}
          noValidate={noValidate}
          className="form"
          id={`${name}-form`}
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`popup__button form__btn ${
              !isFormValid ? "form__btn_disabled" : ""
            }`}
          >
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
