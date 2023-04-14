import React from 'react';
import Header from './components/Header.js';
import Main from './components/Main';
import Footer from './components/Footer';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})

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
  

  function turnAllPopupsState(bool) {
    setIsEditAvatarPopupOpen(bool)
    setIsEditProfilePopupOpen(bool)
    setIsAddPlacePopupOpen(bool)
    setIsConfirmPopupOpen(bool)
    setIsImagePopupOpen(bool)
  }

  function closeByEsc(evt) {
    if(evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    if(isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isConfirmPopupOpen || isImagePopupOpen) {
      document.addEventListener('keydown', closeByEsc)
    } else {
      document.removeEventListener('keydown', closeByEsc)
    }
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, isConfirmPopupOpen, isImagePopupOpen])

  function closeAllPopups() {
    turnAllPopupsState(false);
    setTimeout(() => {
      setSelectedCard({});
    }, 500)
  } 

  return (
    <div className="page">
      <Header />
      <Main onEditAvatar={handleAvatarClick}
            isEditAvatarPopupOpen={isEditAvatarPopupOpen}

            onEditProfile={handleEditProfileClick}
            isEditProfilePopupOpen={isEditProfilePopupOpen}

            onAddCard={handleAddCardClick}
            isAddPlacePopupOpen={isAddPlacePopupOpen}

            onTrashBag={handleTrashBagClick}
            isConfirmPopupOpen={isConfirmPopupOpen}

            isImagePopupOpen={isImagePopupOpen}

            closeAllPopups={closeAllPopups}

            onCardClick={handleCardClick}
            card={selectedCard}
            />
      <Footer />
    </div>
  );
}


export default App;
