import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "../SingleComponent/Input";

function EditProfilePopup({ isOpen, onClose, onAddPlace }) {
  const [placeName, setPlaceName] = useState("");
  const [placeUrl, setPlaceUrl] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setPlaceName("");
      setPlaceUrl("");
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: placeName,
      link: placeUrl,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      btnText="Создать"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      inputNames={["name", "link"]}
      inputValues={[placeName, placeUrl]}
    >
      <Input
        type="text"
        placeholder="Название"
        name="name"
        minLength="2"
        maxLength="30"
        value={placeName}
        onChange={(e) => setPlaceName(e.target.value)}
        isPopupOpen={isOpen}
      />
      <Input
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        minLength="2"
        maxLength="30"
        value={placeUrl}
        onChange={(e) => setPlaceUrl(e.target.value)}
        isPopupOpen={isOpen}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
