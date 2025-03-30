export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape);
};

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);
}

function handleEscape(event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    closeModal(openPopup);
  };
};

export function handleOverlay(event) {
  if (event.target.classList.contains('popup_is-opened')) {
    closeModal(event.target);
  };
};
