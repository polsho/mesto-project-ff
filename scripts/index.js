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

const cardList = document.querySelector(".places__list");

initialCards.forEach(function (card) {
  cardList.append(getCard(card, deleteCard));
});

const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", function (event) {
  document
    .querySelector(".popup_type_edit")
    .classList.add("popup_is-animated", "popup_is-opened");
});

const newCardButton = document.querySelector(".profile__add-button");
newCardButton.addEventListener("click", function (event) {
  document
    .querySelector(".popup_type_new-card")
    .classList.add("popup_is-animated", "popup_is-opened");
});

const cardImageButtons = Array.from(
  document.querySelectorAll(".card__image")
);
cardImageButtons.forEach(function (btn) {
  btn.addEventListener("click", function (event) {
    const popupImage = document.querySelector(".popup_type_image");
    popupImage.classList.add("popup_is-opened");
    popupImage.querySelector('.popup__image').src = btn.src;
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