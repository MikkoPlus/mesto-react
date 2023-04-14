import React from "react";
import Header from "./Header.js";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Input from "./Input";
import Footer from "./Footer";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleAvatarClick() {
    return setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    return setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddCardClick() {
    return setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleTrashBagClick() {
    return setIsConfirmPopupOpen(!isConfirmPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  const isPopupOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isConfirmPopupOpen ||
    isImagePopupOpen;

  React.useEffect(() => {
    function closeByEsc(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isPopupOpen) {
      document.addEventListener("keydown", closeByEsc);
    }
    return () => {
      document.removeEventListener("keydown", closeByEsc);
    };
  }, [isPopupOpen]);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setTimeout(() => {
      setSelectedCard({});
    }, 500);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddCard={handleAddCardClick}
        onTrashBag={handleTrashBagClick}
        onCardClick={handleCardClick}
        card={selectedCard}
      />
      <Footer />
      <section className="popups">
        <PopupWithForm
          name="edit-avatar"
          title="Обновить аватар"
          btnText="Обновить"
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
        >
          <Input
            id="avatar-url"
            type="url"
            placeholder="Ссылка на аватар"
            name="avatar"
          />
        </PopupWithForm>

        <PopupWithForm
          name="edit-profile"
          title="Редактировать профиль"
          btnText="Сохранить"
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
        >
          <Input
            id="profile-name"
            type="text"
            placeholder="Введите имя"
            name="name"
            minLength="2"
            maxLength="20"
          />
          <Input
            id="profile-job"
            type="text"
            placeholder="Введите занятие"
            name="about"
            minLength="2"
            maxLength="200"
          />
        </PopupWithForm>

        <PopupWithForm
          name="add-card"
          title="Новое место"
          btnText="Создать"
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
        >
          <Input
            id="card-name"
            type="text"
            placeholder="Название"
            name="name"
            minLength="2"
            maxLength="30"
          />
          <Input
            id="card-link"
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            minLength="2"
            maxLength="30"
          />
        </PopupWithForm>
        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          btnText="Да"
          onClose={closeAllPopups}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
      </section>
    </div>
  );
}

export default App;
