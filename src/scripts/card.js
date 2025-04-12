export function getCard(cardItem, delCard, switchLike, openImage, currentUserId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteBtn = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const likeNumber = cardElement.querySelector('.card__like-number');

  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  cardTitle.textContent = cardItem.name;
  likeNumber.textContent = cardItem.likes.length || 0;

  if (cardItem.likes.some((user) => {
    return user._id === currentUserId;
  })) {
    likeBtn.classList.add('card__like-button_is-active');
  }

  if (cardItem.owner._id !== currentUserId) {
    deleteBtn.remove();
  };

  deleteBtn.addEventListener('click', (event) => {
    delCard(event, cardItem._id);
  });
  likeBtn.addEventListener('click', (event) => {
    switchLike(event, cardItem._id);
  });
  cardImage.addEventListener('click', openImage);
  return cardElement;
};

export function deleteCard(event) {
  const card = event.target.closest('.card');
  if (card) {
    card.remove();
  };
};

export function toggleLike(likeBtn) {
  likeBtn.classList.toggle('card__like-button_is-active');
};