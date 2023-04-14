export const popupWithEditProfileFormSelector = '#edit-profile-popup',
             popupWithAddCardFormSelector = '#add-card-popup',
             popupWithFullscreenImageSelector = '#open-image-popup',
             popupWithRefreshAvatarFormSelector = '#refresh-avatar-popup',
             popupWithDeleteConfirmButtonSelector = '#delete-card-popup',
             buttonEditProfileOpenPopup = document.querySelector('.profile__edit-btn'),
             buttonAddCardOpenPopup = document.querySelector('.profile__add-button'),
             cardTemplateSelector = '#place-card-template',
             placeCardSelector = '.places__list',
             formValidators = {},
             loadingMessages = {
                save: 'Сохранение...',
                refresh: 'Обновление...',
                delete: 'Удаление...'
             },
             profileDataSelectors = {
                 profileNameSelector: '.profile__name',
                 profileJobSelector: '.profile__job',
                 profileAvatarSelector: '.profile__avatar'
             },
             avatarElement = document.querySelector('.profile__avatar-wrapper'),
             validateConfig = {
                 formSelector: '.form',
                 inputSelector: '.form__input',
                 submitButtonSelector: '.form__btn',
                 inactiveButtonClass: 'form__btn_disabled',
                 inputErrorClass: 'form__input_type_error'
             },
             apiConfig = {
                baseUrlAdress: 'https://nomoreparties.co/v1/cohort-62/',
                autorisationToken: '21d67130-4b88-41b2-a64a-c76e797b432e'
             };