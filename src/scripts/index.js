import '../pages/index.css';
import {initialCards} from './cards';
import { openModal, closeModal, handleOverlay } from './modal';
import { getCard, deleteCard, toggleLike } from './card';

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
const profileEditForm = profileEditModal.querySelector('form');
const nameInput = profileEditForm.querySelector('.popup__input_type_name');
const jobInput = profileEditForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const newPlaceForm = addCardModal.querySelector('form');
const placeInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const urlInput = newPlaceForm.querySelector('.popup__input_type_url');

addCardBtn.addEventListener('click', () => openModal(addCardModal));

popups.forEach((modal) => {
  modal.addEventListener('mouseup', handleOverlay);
  modalCloseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      closeModal(modal);
    });
  }); 
});

function openCardImage(event) {
  modalImage.src = event.target.src;
  modalImage.alt = event.target.alt;
  modalCaption.textContent = event.target.alt;
  openModal(imageCardModal);
};

profileEditBtn.addEventListener('click', () => {
  openModal(profileEditModal);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

function handleFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profileEditModal);
};

profileEditForm.addEventListener('submit', handleFormSubmit);

function handleCardFormSubmit(event) {
  event.preventDefault();
  const formData = {
    name: placeInput.value,
    link: urlInput.value
  };
  const newCard = getCard(formData, deleteCard, toggleLike, openCardImage);
  cardList.prepend(newCard);
  closeModal(addCardModal);
  newPlaceForm.reset();
};

newPlaceForm.addEventListener('submit', handleCardFormSubmit);

initialCards.forEach(cardItem => {
  const card = getCard(cardItem, deleteCard, toggleLike, openCardImage);
  cardList.append(card);
});