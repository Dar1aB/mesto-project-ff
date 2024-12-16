const cardList = document.querySelector('.places__list');

function getCard(cardItem, delCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteBtn = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__image').src = cardItem.link;
  cardElement.querySelector('.card__image').alt = cardItem.name;
  cardElement.querySelector('.card__title').textContent = cardItem.name;
  deleteBtn.addEventListener('click', delCard);
  return cardElement;
};

function deleteCard(cardElement) {
  const card = cardElement.target.parentElement; 
  card.remove();
};

initialCards.forEach(cardItem => {
  const card = getCard(cardItem, deleteCard);
  cardList.append(card);
});