export { 
  cardList, popups, profileEditModal, addCardModal, imageCardModal, modalImage, modalCaption,
  modalCloseBtns, profileEditBtn, addCardBtn, profileEditForm, nameInput, jobInput, profileTitle,
  profileDescription, newPlaceForm, placeInput, urlInput, avatarEditModal, avatarEditForm, urlAvatarInput, avatarImage, data 
};

const cardList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const profileEditModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const imageCardModal = document.querySelector('.popup_type_image');
const modalImage = imageCardModal.querySelector('.popup__image');
const modalCaption = imageCardModal.querySelector('.popup__caption');
const modalCloseBtns = document.querySelectorAll('.popup__close');
const profileEditBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const profileEditForm = document.forms["edit-profile"];
const nameInput = profileEditForm.querySelector('.popup__input_type_name');
const jobInput = profileEditForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const newPlaceForm = document.forms["new-place"];
const placeInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const urlInput = newPlaceForm.querySelector('.popup__input_type_url');
const avatarEditModal = document.querySelector('.popup_type_avatar');
const avatarEditForm = document.forms["avatar-url"];
const urlAvatarInput = avatarEditForm.querySelector('.popup__input_type_avatar-url');
const avatarImage = document.querySelector('.profile__image');
const data = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};