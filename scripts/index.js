const cardList = document.querySelector(".places__list");

const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardSaveButton = newCardPopup.querySelector(".popup__button");

const editProfileButton = document.querySelector(".profile__edit-button");
const newProfilePopup = document.querySelector(".popup_type_edit");
const newProfileSaveButton = newProfilePopup.querySelector(".popup__button");

const profileTitle = document.querySelector(".profile__title").textContent;
const profileDescription = document.querySelector(
  ".profile__description"
).textContent;

const popupImage = document.querySelector(".popup_type_image");
const popupImagePic = popupImage.querySelector(".popup__image");
const popupImageCap = popupImage.querySelector(".popup__caption");

const closePopupButtons = Array.from(
  document.querySelectorAll(".popup__close")
);

function getCard(cardInfo, deleteCard) {
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

  likeButton.addEventListener("click", function (event) {
    event.target.classList.toggle("card__like-button_is-active");
  });

  cardItemImage.addEventListener("click", function () {
    openPopup(popupImage);
    popupImagePic.src = cardItemImage.src;
    popupImagePic.alt = cardItemImage.alt;
    popupImageCap.textContent = cardItemTitle.textContent;
  });

  return cardItem;
}

function deleteCard(event) {
  event.target.closest(".card").remove();
}

function addNewCard(event) {
  const newCardInfoForm = event.target.closest(".popup__form");
  const newCardName = newCardInfoForm.querySelector(
    ".popup__input_type_card-name"
  );
  const newCardSource = newCardInfoForm.querySelector(".popup__input_type_url");
  const newCard = {
    name: newCardName.value,
    link: newCardSource.value,
    alt: newCardName.value,
  };
  cardList.prepend(getCard(newCard, deleteCard));
  newCardInfoForm.reset();
}

function editProfile(event) {
  const newProfileInfoForm = event.target.closest(".popup__form");
  profileTitle = newProfileInfoForm.querySelector(
    ".popup__input_type_name"
  ).value;
  profileDescription = newProfileInfoForm.querySelector(
    ".popup__input_type_description"
  ).value;
  newProfileInfoForm.reset();
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_is-animated", "popup_is-opened");
}

function closePopup(event) {
  event.target.closest(".popup").classList.remove("popup_is-opened");
}

initialCards.forEach(function (card) {
  console.log(card);
  cardList.append(getCard(card, deleteCard));
});

editProfileButton.addEventListener("click", () => openPopup(newProfilePopup));

newCardButton.addEventListener("click", () => openPopup(newCardPopup));

closePopupButtons.forEach(function (btn) {
  btn.addEventListener("click", closePopup);
});

newProfileSaveButton.addEventListener("submit", editProfile);
newCardSaveButton.addEventListener("submit", addNewCard);
