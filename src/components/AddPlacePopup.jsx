import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

function EditProfilePopup({ isOpen, onClose, onAddPlace }) {
  const [placeName, setPlaceName] = useState('')
  const [placeUrl, setPlaceUrl] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    onAddPlace({
      name: placeName,
      link: placeUrl
    })
  }

  return (
    <PopupWithForm
    name="add-card"
    title="Новое место"
    btnText="Создать"
    onClose={onClose}
    isOpen={isOpen}
    onSubmit={handleSubmit}
  >
    <Input
      id="card-name"
      type="text"
      placeholder="Название"
      name="name"
      minLength="2"
      maxLength="30"
      value={placeName}
      onChange={(e) => setPlaceName(e.target.value)}
      />
    <Input
      id="card-link"
      type="url"
      placeholder="Ссылка на картинку"
      name="link"
      minLength="2"
      maxLength="30"
      value={placeUrl}
      onChange={(e) => setPlaceUrl(e.target.value)}
    />
  </PopupWithForm>
  );
}

export default EditProfilePopup;
