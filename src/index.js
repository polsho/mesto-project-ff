import { initialCards } from './scripts/initialCards.js';
import { getCard, deleteCard, likeCard, opencardImagePopup } from './scripts/cards.js';
import {openPopup, closePopup} from './scripts/modal.js';
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

const cardTemplateconfig = {
  cardTemplateSelector:  "#card-template",
  cardItemSelector:      ".card",
  cardItemImageSelector: ".card__image",
  cardItemTitleSelector: ".card__title",
  removeButtonSelector:  ".card__delete-button",
  likeButtonSelector:    ".card__like-button"
}

const closePopupButtons = Array.from(
  document.querySelectorAll(".popup__close")
);

const popups = Array.from(
  document.querySelectorAll(".popup")
);

function addNewCard(event) {
  const newCardName = newCardForm.querySelector(".popup__input_type_card-name");
  const newCardSource = newCardForm.querySelector(".popup__input_type_url");
  const newCard = {
    name: newCardName.value,
    link: newCardSource.value,
    alt: newCardName.value,
  };
  cardList.prepend(getCard(newCard, deleteCard, likeCard, opencardImagePopup, cardTemplateconfig));
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

initialCards.forEach(function (card) {
  cardList.append(getCard(card, deleteCard, likeCard, opencardImagePopup, cardTemplateconfig));
});

editProfileButton.addEventListener("click", () => openPopup(newProfilePopup));

newCardButton.addEventListener("click", () => openPopup(newCardPopup));

closePopupButtons.forEach(function (btn) {
  btn.addEventListener("click", (event) =>
  closePopup(event.target.closest(".popup"))
  );
});

popups.forEach(function(popup) {
  popup.classList.add("popup_is-animated");
})

newProfileForm.addEventListener("submit", editProfile);
newCardForm.addEventListener("submit", addNewCard);
