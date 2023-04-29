import closeIcon from "../../images/icons/close-icon.svg";
import { useRef, useEffect, useState, useContext } from "react";
import { ApiRequestLoadingContext } from "../../contexts/ApiRequestLoadingContext";
import { Transition } from "react-transition-group";
import Spinner from "../SingleComponent/Spinner";

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
  const isLoading = useContext(ApiRequestLoadingContext);
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
          className={`form ${isLoading ? "form_is-loading" : ""}`}
          id={`${name}-form`}
          name={name}
          onSubmit={onSubmit}
        >
          <Transition
            in={isLoading}
            timeout={500}
            appear
            mountOnEnter
            unmountOnExit
          >
            {(state) => <Spinner className={`spinner ${state}`} />}
          </Transition>
          {children}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`popup__button form__btn ${
              !isFormValid || isLoading ? "form__btn_disabled" : ""
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
