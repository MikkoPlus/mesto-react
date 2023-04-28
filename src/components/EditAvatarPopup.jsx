import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };
  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);
  
  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      btnText="Обновить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        required
        id="avatar-url"
        type="url"
        placeholder="Ссылка на аватар"
        name="avatar"
        className={`form__input form__input_type_url`}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
