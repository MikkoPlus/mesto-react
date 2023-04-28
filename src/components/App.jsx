import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDelete";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardId, setCardId] = useState("");

  useEffect(() => {
    api
      .getCards()
      .then((data) => {
        setCards(
          data.map((item) => {
            return {
              name: item.name,
              _id: item._id,
              link: item.link,
              likes: item.likes,
              owner: item.owner,
            };
          })
        );
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api.getProfileData().then((data) => setCurrentUser(data));
  }, []);


  function handleLikeCard(card) {
    const isLiked = card.likes.some((human) => human._id === currentUser._id);

    api
      .toggleLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((oldCard) => (oldCard._id === card._id ? newCard : oldCard))
        );
      })
      .catch((error) => console.log(error));
  }

  function handleDeleteCard(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardId));
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
      .finally(() => closeAllPopups());
  }

  function handleUpdateUser(requestObj) {
    api
      .setUserInfo(requestObj)
      .then((updateProfileData) => setCurrentUser(updateProfileData))
      .catch((err) => console.log(`Ошибка: ${err.status}`))
      .finally(() => closeAllPopups());
  }

  function handleUpdateAvatar(requestObj) {
    api
      .postAvatar(requestObj)
      .then((updateProfileData) => setCurrentUser(updateProfileData))
      .catch((err) => console.log(`Ошибка: ${err.status}`))
      .finally(() => closeAllPopups());
  }

  function handleAddPlace(requestObj) {
    api
      .postNewCard(requestObj)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
      .finally(() => closeAllPopups());
  }

  function handleAvatarClick() {
    return setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    return setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddCardClick() {
    return setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleTrashBagClick(currentCardId) {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setCardId(currentCardId);
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

  useEffect(() => {
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleLikeCard}
          onEditAvatar={handleAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddCard={handleAddCardClick}
          onTrashBagClick={handleTrashBagClick}
          onCardClick={handleCardClick}
          card={selectedCard}
        />
        <Footer />
        <section className="popups">
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />

          <ConfirmDeletePopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleDeleteCard}
            currentCardId={cardId}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen}
          />
        </section>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
