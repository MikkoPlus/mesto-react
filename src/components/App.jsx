import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ApiRequestLoadingContext } from "../contexts/ApiRequestLoadingContext";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import api from "../utils/Api";
import Popups from "./Popups/Popups";

function App() {
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardId, setCardId] = useState("");

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(requestObj) {
    setIsLoading(true);
    api
      .setUserInfo(requestObj)
      .then((updateProfileData) => {
        setCurrentUser(updateProfileData);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(requestObj) {
    setIsLoading(true);
    api
      .postAvatar(requestObj)
      .then((updateProfileData) => {
        setCurrentUser(updateProfileData);
        closeAllPopups();
      })

      .catch((err) => console.log(`Ошибка: ${err.status}`))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlace(requestObj) {
    setIsLoading(true);
    api
      .postNewCard(requestObj)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
      .finally(() => setIsLoading(false));
  }

  function handleAvatarClick() {
    return setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    return setIsEditProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    return setIsAddPlacePopupOpen(true);
  }

  function handleTrashBagClick(currentCardId) {
    setIsConfirmPopupOpen(true);
    setCardId(currentCardId);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
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

  useEffect(() => {
    api
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getProfileData()
      .then((data) => setCurrentUser(data))
      .catch((err) => console.log(err));
  }, []);

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
        <ApiRequestLoadingContext.Provider value={isLoading}>
          <Popups
            isEditProfilePopupOpen={isEditProfilePopupOpen}
            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            isAddPlacePopupOpen={isAddPlacePopupOpen}
            isConfirmPopupOpen={isConfirmPopupOpen}
            isImagePopupOpen={isImagePopupOpen}
            closeAllPopups={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onUpdateUser={handleUpdateUser}
            onAddPlace={handleAddPlace}
            onDeleteCard={handleDeleteCard}
            currentCardId={cardId}
            selectedCard={selectedCard}
          />
        </ApiRequestLoadingContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
