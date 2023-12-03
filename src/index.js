import { getCard } from "./scripts/card.js";
import { openPopup, closePopup } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  getData,
  getUserData,
  editUserData,
  postCard,
  editImage,
} from "./scripts/api.js";
import "./pages/index.css";

const cardList = document.querySelector(".places__list");

const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardForm = newCardPopup.querySelector(".popup__form");

const editProfileButton = document.querySelector(".profile__edit-button");
const editAvatar = document.querySelector(".profile__image");
const newProfilePopup = document.querySelector(".popup_type_edit");
const newProfileForm = newProfilePopup.querySelector(".popup__form");
const editAvatarPopup = document.querySelector(".popup_type_edit-avatar");
const editAvatarForm = editAvatarPopup.querySelector(".popup__form");

const popupImage = document.querySelector(".popup_type_image");
const popupImagePic = popupImage.querySelector(".popup__image");
const popupImageCap = popupImage.querySelector(".popup__caption");

const profileData = {
  title: document.querySelector(".profile__title"),
  description: document.querySelector(".profile__description"),
  image: document.querySelector(".profile__image"),
};

const cardTemplateConfig = {
  cardTemplateSelector: "#card-template",
  cardItemSelector: ".card",
  cardItemImageSelector: ".card__image",
  cardItemTitleSelector: ".card__title",
  removeButtonSelector: ".card__delete-button",
  likeButtonSelector: ".card__like-button",
  likesQtySelector: ".card__likes-qty",
};

const formConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const closePopupButtons = document.querySelectorAll(".popup__close");

const popups = document.querySelectorAll(".popup");

export function renderLoading(isLoading, formButton) {
  if (isLoading) {
    formButton.textContent = "Сохранение...";
  } else {
    formButton.textContent = "Сохранить";
  }
}

function addNewCard(event) {
  event.preventDefault();
  renderLoading(
    true,
    newCardForm.querySelector(formConfig.submitButtonSelector)
  );
  const newCardName = newCardForm.querySelector(".popup__input_type_card-name");
  const newCardSource = newCardForm.querySelector(".popup__input_type_url");
  const newCard = {
    name: newCardName.value,
    link: newCardSource.value,
    alt: newCardName.value,
  };

  postCard(newCard).then((cardInfo) => {
    cardList.prepend(
      getCard(cardInfo, openCardImagePopup, profileData, cardTemplateConfig)
    );
  });

  newCardForm.reset();
  clearValidation(newCardForm, formConfig);
  renderLoading(
    false,
    newCardForm.querySelector(formConfig.submitButtonSelector)
  );
  closePopup(newCardPopup);
}

function editProfile(event) {
  event.preventDefault();
  renderLoading(
    true,
    newProfileForm.querySelector(formConfig.submitButtonSelector)
  );
  profileData.title.textContent = newProfileForm.querySelector(
    ".popup__input_type_name"
  ).value;
  profileData.description.textContent = newProfileForm.querySelector(
    ".popup__input_type_description"
  ).value;

  editUserData(profileData);
  renderLoading(
    false,
    newProfileForm.querySelector(formConfig.submitButtonSelector)
  );
  closePopup(newProfilePopup);
}

function openCardImagePopup(event) {
  openPopup(popupImage);
  popupImagePic.src = event.target.src;
  popupImagePic.alt = event.target.alt;
  popupImageCap.textContent = event.target.alt;
}

getUserData().then((userData) => {
  profileData.title.textContent = userData.name;
  profileData.description.textContent = userData.about;
  profileData.image.style.backgroundImage = `url(${userData.avatar})`;
  profileData.id = userData._id;
});

Promise.all([getData("users"), getData("cards")]).then(([users, cards]) => {
  cards.forEach((card) => {
    cardList.append(
      getCard(card, openCardImagePopup, profileData, cardTemplateConfig)
    );
  });
});

const editAvatarImage = (event) => {
  event.preventDefault();
  renderLoading(
    true,
    editAvatarForm.querySelector(formConfig.submitButtonSelector)
  );
  const newAvatarSource = editAvatarForm.querySelector(
    ".popup__input_type_avatar-link"
  );
  editImage(newAvatarSource).then((data) => {
    editAvatar.style.backgroundImage = `url(${data.avatar})`;
  });
  renderLoading(
    false,
    editAvatarForm.querySelector(formConfig.submitButtonSelector)
  );
  closePopup(editAvatarForm);
};

enableValidation(formConfig);

editProfileButton.addEventListener("click", function () {
  openPopup(newProfilePopup);
  newProfileForm.querySelector(".popup__input_type_name").value =
    profileData.title.textContent;
  newProfileForm.querySelector(".popup__input_type_description").value =
    profileData.description.textContent;
  clearValidation(newProfilePopup, formConfig);
});

editAvatar.addEventListener("click", () => openPopup(editAvatarPopup));

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
editAvatarForm.addEventListener("submit", editAvatarImage);
