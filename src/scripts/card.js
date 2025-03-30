export function getCard(cardItem, delCard, switchLike, openImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteBtn = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  cardTitle.textContent = cardItem.name;
  deleteBtn.addEventListener('click', delCard);
  likeBtn.addEventListener('click', switchLike);
  cardImage.addEventListener('click', openImage);
  return cardElement;
};

export function deleteCard(event) {
  const card = event.target.closest('.card');
  card.remove();
};

export function toggleLike(event) {
  event.target.classList.toggle('card__like-button_is-active');
};