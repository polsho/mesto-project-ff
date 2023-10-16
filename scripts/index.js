const cardList = document.querySelector(".places__list");

function getCard(cardInfo, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;

  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const removeButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");

  cardItem.querySelector(".card__image").src = cardInfo.link;
  cardItem.querySelector(".card__title").textContent = cardInfo.name;

  removeButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", function () {});

  return cardItem;
}

function deleteCard(event) {
  event.target.closest(".card").remove();
}

function addNewCard(event) {
  const newCardInfoForm = event.target.closest(".popup__form");
  const newCard = {};
  newCard.name = newCardInfoForm.querySelector(
    ".popup__input_type_card-name"
  ).value;
  newCard.link = newCardInfoForm.querySelector(".popup__input_type_url").value;
  initialCards.push(newCard);
}

function editProfile(event) {
  const newProfileInfoForm = event.target.closest(".popup__form");
  document.querySelector(".profile__title").textContent =
  newProfileInfoForm.querySelector(".popup__input_type_name").value;
  document.querySelector(".profile__description").textContent =
  newProfileInfoForm.querySelector(".popup__input_type_description").value;
}

initialCards.forEach(function (card) {
  cardList.append(getCard(card, deleteCard));
});

const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", function (event) {
  const newProfilePopup = document.querySelector(".popup_type_edit");
  newProfilePopup.classList.add("popup_is-animated", "popup_is-opened");

  const newProfileSaveButton = newProfilePopup.querySelector(".popup__button");
  newProfileSaveButton.addEventListener("click", editProfile);
});

const newCardButton = document.querySelector(".profile__add-button");
newCardButton.addEventListener("click", function (event) {
  const newCardPopup = document.querySelector(".popup_type_new-card");
  newCardPopup.classList.add("popup_is-animated", "popup_is-opened");

  const newCardSaveButton = newCardPopup.querySelector(".popup__button");
  newCardSaveButton.addEventListener("click", addNewCard);
});

const cardImageButtons = Array.from(document.querySelectorAll(".card__image"));
cardImageButtons.forEach(function (btn) {
  btn.addEventListener("click", function (event) {
    const popupImage = document.querySelector(".popup_type_image");
    popupImage.classList.add("popup_is-animated", "popup_is-opened");
    popupImage.querySelector(".popup__image").src = btn.src;
  });
});

const closePopupButtons = Array.from(
  document.querySelectorAll(".popup__close")
);
closePopupButtons.forEach(function (btn) {
  btn.addEventListener("click", function (event) {
    event.target.closest(".popup").classList.remove("popup_is-opened");
  });
});

const cardLikeButtons = Array.from(
  document.querySelectorAll(".card__like-button")
);
cardLikeButtons.forEach(function (btn) {
  btn.addEventListener("click", function (event) {
    event.target.classList.add("card__like-button_is-active");
  });
});