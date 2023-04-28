import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
        name,
        about: description
    })
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <Input
        id="profile-name"
        type="text"
        placeholder="Введите имя"
        name="name"
        minLength="2"
        maxLength="20"
        value={name || ''}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        id="profile-job"
        type="text"
        placeholder="Введите занятие"
        name="about"
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={(e) => setDescription(e.target.value)}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
