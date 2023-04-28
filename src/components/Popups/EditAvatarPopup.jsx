import { useState, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  const [isValid, setIsValid] = useState(false);
  const [validMessage, setValidMessage] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [avatarValue, setAvatarValue] = useState("");

  function handleInputChange(e) {
    setIsValid(avatarRef.current.validity.valid);
    setValidMessage(avatarRef.current.validationMessage);
    setAvatarValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
      setIsDirty(false);
      setAvatarValue("");
    }
  }, [isOpen]);

  // Я не понял как передать ref в функциональный компонент, поэтому создал обыкновенный инпут, а так же перенёс весь функционал валидации инпута в этот компонент(дублируя и усложняя код)
  // Если можно, хотел бы в этом компоненте использовать функциональный компонент Input, а использование useRef оставить в PopupWithForm, т.к реализовал валидацию в том числе с использованием ref, или может есть более элегантный и красивый способ валидировать формы и инпуты?
  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      btnText="Обновить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      inputNames={["avatar"]}
      inputValues={[avatarValue]}
    >
      <input
        ref={avatarRef}
        required
        type="url"
        placeholder="Ссылка на аватар"
        name="avatar"
        className={`form__input form__input_type_url`}
        onInput={handleInputChange}
        onBlur={() => setIsDirty(true)}
      />
      {isDirty && !isValid && (
        <span id={`input-error`} className="form__input-text-error">
          {validMessage}
        </span>
      )}
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
