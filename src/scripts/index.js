import '../pages/index.css';
import { delCardFromList, getUserProfileInfo, getInitialCards, likeCard, unlikeCard, updateProfileInfo, addNewCard, updateAvatarImage } from './api';
import { openModal, closeModal, handleOverlay } from './modal';
import { enableValidation, clearValidation } from './validation';
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
const avatarEditModal = document.querySelector('.popup_type_avatar');
const avatarEditForm = avatarEditModal.querySelector('form');
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
let cardOwnerCurrentId = null;


Promise.all([getUserProfileInfo(), getInitialCards()])
  .then(([userInfo, cards]) => {
    cardOwnerCurrentId = userInfo._id;
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    avatarImage.style.backgroundImage = `url('${userInfo.avatar}')`;
    cards.forEach((cardItem) => {
      const card = getCard(cardItem, deleteCardApi, handleCardLike, openCardImage, cardOwnerCurrentId);
      cardList.append(card);
    });
  })  
  .catch((err) => {
    console.log(err);
  });

  function deleteCardApi(event, cardId) {
    delCardFromList(cardId)
      .then(() => {
        deleteCard(event);
      })
      .catch((err) => {
        console.log(err);
      });
};

function handleCardLike(event, cardId) {
  const isLiked = event.target.classList.contains('card__like-button_is-active');
  let apiCall = null;
  if (isLiked) {
    apiCall = unlikeCard;
  } else {
    apiCall = likeCard;
  }; 

  apiCall(cardId)
    .then((updatedCard) => {
      event.target.closest('.card').querySelector('.card__like-number').textContent = updatedCard.likes.length;
      toggleLike(event.target);
    })
    .catch((err) => {
      console.log(err);
    });
};

enableValidation(data);

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
  clearValidation(profileEditForm, data);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

addCardBtn.addEventListener('click', () => {
  clearValidation(newPlaceForm, data);
  newPlaceForm.reset();
  openModal(addCardModal);
});

avatarImage.addEventListener('click', () => {
  clearValidation(avatarEditForm, data);
  avatarEditForm.reset();
  openModal(avatarEditModal);
});

function handleProfileFormSubmit(event) {
  event.preventDefault();
  event.submitter.textContent = 'Сохранение...';
  
  updateProfileInfo(nameInput.value, jobInput.value)
  .then((userInfo) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    closeModal(profileEditModal);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    event.submitter.textContent = 'Сохранить';
  })
};

profileEditForm.addEventListener('submit', handleProfileFormSubmit);

function handleCardFormSubmit(event) {
  event.preventDefault();
  event.submitter.textContent = 'Сохранение...';

  const formData = {
    name: placeInput.value,
    link: urlInput.value
  };

  addNewCard(formData)
    .then((cardItem) => {
      const newCard = getCard(cardItem, deleteCardApi, handleCardLike, openCardImage, cardOwnerCurrentId);
      cardList.prepend(newCard);
      closeModal(addCardModal);
      newPlaceForm.reset();
      clearValidation(newPlaceForm, data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      event.submitter.textContent = 'Сохранить';
    })
};

newPlaceForm.addEventListener('submit', handleCardFormSubmit);

function handleAvatarFormSubmit(event) {
  event.preventDefault();
  event.submitter.textContent = 'Сохранение...';
  
  updateAvatarImage(urlAvatarInput.value)
  .then((userInfo) => {
    avatarImage.style.backgroundImage = `url('${userInfo.avatar}')`;
    closeModal(avatarEditModal);
    avatarEditForm.reset();
    clearValidation(avatarEditForm, data);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    event.submitter.textContent = 'Сохранить';
  })
};

avatarEditForm.addEventListener('submit', handleAvatarFormSubmit);