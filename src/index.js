import { initialCards } from "./scripts/initialCards.js";
import { getCard, deleteCard, likeCard } from "./scripts/cards.js";
import { openPopup, closePopup } from "./scripts/modal.js";
import "./pages/index.css";

const cardList = document.querySelector(".places__list");

const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardForm = newCardPopup.querySelector(".popup__form");

const editProfileButton = document.querySelector(".profile__edit-button");
const newProfilePopup = document.querySelector(".popup_type_edit");
const newProfileForm = newProfilePopup.querySelector(".popup__form");
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");

const popupImage = document.querySelector(".popup_type_image");
const popupImagePic = popupImage.querySelector(".popup__image");
const popupImageCap = popupImage.querySelector(".popup__caption");

const cardTemplateConfig = {
  cardTemplateSelector: "#card-template",
  cardItemSelector: ".card",
  cardItemImageSelector: ".card__image",
  cardItemTitleSelector: ".card__title",
  removeButtonSelector: ".card__delete-button",
  likeButtonSelector: ".card__like-button",
};

const closePopupButtons = Array.from(
  document.querySelectorAll(".popup__close")
);

const popups = Array.from(document.querySelectorAll(".popup"));

function addNewCard(event) {
  const newCardName = newCardForm.querySelector(".popup__input_type_card-name");
  const newCardSource = newCardForm.querySelector(".popup__input_type_url");
  const newCard = {
    name: newCardName.value,
    link: newCardSource.value,
    alt: newCardName.value,
  };
  cardList.prepend(
    getCard(
      newCard,
      deleteCard,
      likeCard,
      openCardImagePopup,
      cardTemplateConfig
    )
  );
  newCardForm.reset();
  closePopup(newCardPopup);

  return event.preventDefault();
}

function editProfile(event) {
  event.preventDefault();
  profileTitle.textContent = newProfileForm.querySelector(
    ".popup__input_type_name"
  ).value;
  profileDescription.textContent = newProfileForm.querySelector(
    ".popup__input_type_description"
  ).value;
  closePopup(newProfilePopup);
}

function openCardImagePopup(cardImage, cardTitle) {
  cardImage.addEventListener("click", function (event) {
    openPopup(popupImage);
    popupImagePic.src = event.target.src;
    popupImagePic.alt = event.target.alt;
    popupImageCap.textContent = cardTitle.textContent;
  });
}

initialCards.forEach(function (card) {
  cardList.append(
    getCard(card, deleteCard, likeCard, openCardImagePopup, cardTemplateConfig)
  );
});

const cards = Array.from(
  cardList.querySelectorAll(cardTemplateConfig.cardItemSelector)
);

cards.forEach(function (card) {
  const cardImage = card.querySelector(
    cardTemplateConfig.cardItemImageSelector
  );
  const cardTitle = card.querySelector(
    cardTemplateConfig.cardItemTitleSelector
  );
  openCardImagePopup(cardImage, cardTitle);
});

editProfileButton.addEventListener("click", function () {
  openPopup(newProfilePopup);
  newProfileForm.querySelector(".popup__input_type_name").value =
    profileTitle.textContent;
  newProfileForm.querySelector(".popup__input_type_description").value =
    profileDescription.textContent;
});

newCardButton.addEventListener("click", () => openPopup(newCardPopup));

closePopupButtons.forEach(function (btn) {
  btn.addEventListener("click", (event) =>
    closePopup(event.target.closest(".popup"))
  );
});

popups.forEach(function (popup) {
  popup.classList.add("popup_is-animated");
});

newProfileForm.addEventListener("submit", editProfile);
newCardForm.addEventListener("submit", addNewCard);
