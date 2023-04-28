import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ isOpen, onClose, currentCardId, onDeleteCard }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(currentCardId);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="delete-card"
      title="Вы уверены?"
      btnText="Да"
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}

export default ConfirmDeletePopup;
