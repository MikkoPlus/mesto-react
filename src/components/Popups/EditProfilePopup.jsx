import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "../SingleComponent/Input";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      Novalidate
      name="edit-profile"
      title="Редактировать профиль"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      inputNames={["name", "about"]}
      inputValues={[name, description]}
    >
      <Input
        type="text"
        placeholder="Введите имя"
        name="name"
        minLength="2"
        maxLength="20"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        isPopupOpen={isOpen}
      />
      <Input
        type="text"
        placeholder="Введите занятие"
        name="about"
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
        isPopupOpen={isOpen}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
