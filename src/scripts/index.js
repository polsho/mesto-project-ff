import { getCard, likeCard, deleteCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import { mestoApi } from "./api.js";
import "../pages/index.css";

const cardList = document.querySelector(".places__list");

const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardForm = newCardPopup.querySelector(".popup__form");
const newCardSaveButton = newCardPopup.querySelector(".popup__button");
const newCardName = newCardForm.querySelector(".popup__input_type_card-name");
const newCardSource = newCardForm.querySelector(".popup__input_type_url");

const editProfileButton = document.querySelector(".profile__edit-button");
const editAvatar = document.querySelector(".profile__image");
const newProfilePopup = document.querySelector(".popup_type_edit");
const newProfileForm = newProfilePopup.querySelector(".popup__form");
const newProfileName = newProfileForm.querySelector(".popup__input_type_name");
const newProfileDescription = newProfileForm.querySelector(
  ".popup__input_type_description"
);
const profileSaveButton = newProfilePopup.querySelector(".popup__button");

const editAvatarPopup = document.querySelector(".popup_type_edit-avatar");
const editAvatarForm = editAvatarPopup.querySelector(".popup__form");
const newAvatarSource = editAvatarForm.querySelector(
  ".popup__input_type_avatar-link"
);
const avatarSaveButton = editAvatarPopup.querySelector(".popup__button");

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
  activeLikeButtonClass: "card__like-button_is-active",
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

function renderLoading(isLoading, formButton) {
  if (isLoading) {
    formButton.textContent = "Сохранение...";
  } else {
    formButton.textContent = "Сохранить";
  }
}

Promise.all([mestoApi.getUserData(), mestoApi.getCardsList()])
  .then(([userData, cards]) => {
    profileData.title.textContent = userData.name;
    profileData.description.textContent = userData.about;
    profileData.image.style.backgroundImage = `url(${userData.avatar})`;
    profileData.id = userData._id;

    cards.forEach((card) => {
      cardList.append(
        getCard(
          card,
          likeCard,
          deleteCard,
          openCardImagePopup,
          profileData,
          cardTemplateConfig
        )
      );
    });
  })
  .catch((err) => {
    console.log(`Ошибка.....: ${err}`);
  });

function addNewCard(event) {
  event.preventDefault();
  renderLoading(true, newCardSaveButton);
  const newCard = {
    name: newCardName.value,
    link: newCardSource.value,
    alt: newCardName.value,
  };

  mestoApi.addNewCard(newCard)
    .then((cardInfo) => {
      cardList.prepend(
        getCard(
          cardInfo,
          likeCard,
          deleteCard,
          openCardImagePopup,
          profileData,
          cardTemplateConfig
        )
      );
      newCardForm.reset();
      clearValidation(newCardForm, formConfig);
      closePopup(newCardPopup);
    })
    .catch((err) => {
      console.log(`Ошибка.....: ${err}`);
    })
    .finally(() => {
      renderLoading(false, newCardSaveButton);
    });
}

function editProfile(event) {
  event.preventDefault();
  renderLoading(true, profileSaveButton);

  const name = newProfileForm.querySelector(".popup__input_type_name").value;
  const about = newProfileForm.querySelector(
    ".popup__input_type_description"
  ).value;

  mestoApi.editUserData(name, about)
    .then((userData) => {
      profileData.title.textContent = userData.name;
      profileData.description.textContent = userData.about;
      closePopup(newProfilePopup);
    })
    .catch((err) => {
      console.log(`Ошибка.....: ${err}`);
    })
    .finally(() => {
      renderLoading(false, profileSaveButton);
    });
}

function editAvatarImage(event) {
  event.preventDefault();
  renderLoading(true, avatarSaveButton);

  mestoApi.editProfileAvatar(newAvatarSource)
    .then((data) => {
      editAvatar.style.backgroundImage = `url(${data.avatar})`;
      editAvatarForm.reset();
      closePopup(editAvatarPopup);
    })
    .catch((err) => {
      console.log(`Ошибка.....: ${err}`);
    })
    .finally(() => {
      renderLoading(false, avatarSaveButton);
    });
}

function openCardImagePopup(imageName, imageSrc) {
  openPopup(popupImage);
  popupImagePic.src = imageSrc;
  popupImagePic.alt = imageName;
  popupImageCap.textContent = imageName;
}

enableValidation(formConfig);

editProfileButton.addEventListener("click", function () {
  openPopup(newProfilePopup);
  newProfileName.value = profileData.title.textContent;
  newProfileDescription.value = profileData.description.textContent;
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
