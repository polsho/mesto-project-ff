import { initialCards } from './scripts/cards.js';
import './pages/index.css';

const cardList = document.querySelector(".places__list");

const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardForm = newCardPopup.querySelector(".popup__form");

const editProfileButton = document.querySelector(".profile__edit-button");
const newProfilePopup = document.querySelector(".popup_type_edit");
const newProfileForm = newProfilePopup.querySelector(".popup__form");
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");
newProfileForm.querySelector(".popup__input_type_name").value = profileTitle.textContent;
newProfileForm.querySelector(
    ".popup__input_type_description"
  ).value = profileDescription.textContent;

const popupImage = document.querySelector(".popup_type_image");
const popupImagePic = popupImage.querySelector(".popup__image");
const popupImageCap = popupImage.querySelector(".popup__caption");

const closePopupButtons = Array.from(
  document.querySelectorAll(".popup__close")
);

function getCard(cardInfo, deleteCard, likeCard, openPopupImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);

  const cardItemImage = cardItem.querySelector(".card__image");
  const cardItemTitle = cardItem.querySelector(".card__title");
  const removeButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");

  cardItemImage.src = cardInfo.link;
  cardItemTitle.textContent = cardInfo.name;
  cardItemImage.alt = cardInfo.alt;

  removeButton.addEventListener("click", deleteCard);

  likeButton.addEventListener("click", likeCard);

  cardItemImage.addEventListener("click", openPopupImage);

  return cardItem;
}

function deleteCard(event) {
  event.target.closest(".card").remove();
}

function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

function openPopupImage(event) {
  openPopup(popupImage);
  console.log(event.target);
  popupImagePic.src = event.target.src;
  popupImagePic.alt = event.target.alt;
  popupImageCap.textContent = event.target.alt; // изменить на cardItemTitle.textContent
}

function addNewCard(event) {
  const newCardName = newCardForm.querySelector(".popup__input_type_card-name");
  const newCardSource = newCardForm.querySelector(".popup__input_type_url");
  const newCard = {
    name: newCardName.value,
    link: newCardSource.value,
    alt: newCardName.value,
  };
  cardList.prepend(getCard(newCard, deleteCard, likeCard, openPopupImage));
  newCardForm.reset();
  closePopup(newCardPopup);

  return event.preventDefault();
}

function editProfile(event) {
  event.preventDefault();
  profileTitle.textContent = newProfileForm.querySelector(".popup__input_type_name").value;
  profileDescription.textContent = newProfileForm.querySelector(
    ".popup__input_type_description"
  ).value;
  closePopup(newProfilePopup);
}

function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

function closePopupByOverlay(event) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (event.target.classList.contains('popup_is-opened')) {
    closePopup(openedPopup);
  }
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_is-animated", "popup_is-opened");
  document.addEventListener('keydown', closePopupByEsc);
  popupElement.addEventListener('click', closePopupByOverlay);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closePopupByEsc);
  popupElement.removeEventListener('click', closePopupByOverlay);
}

initialCards.forEach(function (card) {
  cardList.append(getCard(card, deleteCard, likeCard, openPopupImage));
});

editProfileButton.addEventListener("click", () => openPopup(newProfilePopup));

newCardButton.addEventListener("click", () => openPopup(newCardPopup));

closePopupButtons.forEach(function (btn) {
  btn.addEventListener("click", (event) =>
    closePopup(event.target.closest(".popup"))
  );
});

newProfileForm.addEventListener("submit", editProfile);
newCardForm.addEventListener("submit", addNewCard);
