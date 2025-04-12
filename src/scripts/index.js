import '../pages/index.css';
import { delCardFromList, getUserProfileInfo, getInitialCards, likeCard, unlikeCard, updateProfileInfo, addNewCard, updateAvatarImage } from './api';
import { openModal, closeModal, handleOverlay } from './modal';
import { enableValidation, clearValidation } from './validation';
import { getCard, deleteCard, toggleLike } from './card';
import { 
   cardList, popups, profileEditModal, addCardModal, imageCardModal, modalImage, modalCaption,
   modalCloseBtns, profileEditBtn, addCardBtn, profileEditForm, nameInput, jobInput, profileTitle,
   profileDescription, newPlaceForm, placeInput, urlInput, avatarEditModal, avatarEditForm, urlAvatarInput, avatarImage, data 
} from './utils/constants';

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
  newPlaceForm.reset();
  clearValidation(newPlaceForm, data);
  openModal(addCardModal);
});

avatarImage.addEventListener('click', () => {
  avatarEditForm.reset();
  clearValidation(avatarEditForm, data);
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
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    event.submitter.textContent = 'Сохранить';
  })
};

avatarEditForm.addEventListener('submit', handleAvatarFormSubmit);