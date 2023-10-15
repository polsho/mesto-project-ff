
function getCard(cardInfo, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;

  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const removeButton = cardItem.querySelector('.card__delete-button');

  cardItem.querySelector('.card__image').src = cardInfo.link;
  cardItem.querySelector('.card__title').textContent = cardInfo.name;

  removeButton.addEventListener('click', deleteCard);

  return cardItem;
}

function deleteCard(event) {
    event.target.closest('.card').remove();
}

const cardList = document.querySelector('.places__list');

initialCards.forEach(function (card) {
  cardList.append(getCard(card, deleteCard));
});


const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', function(event) {
    document.querySelector('.popup_type_edit').classList.add('popup_is-opened');
});

const newCardButton = document.querySelector('.profile__add-button');
newCardButton.addEventListener('click', function(event) {
    document.querySelector('.popup_type_new-card').classList.add('popup_is-opened');
});

const closePopupButton = document.querySelector('.popup__close');
closePopupButton.addEventListener('click', function(event) {
    event.target.closest('.popup').classList.remove('popup_is-opened');
});