import { openPopup } from "./modal.js";

function getCard(cardInfo, deleteCard, likeCard, opencardImagePopup, cardTemplateconfig) {
  const cardTemplate = document.querySelector(cardTemplateconfig.cardTemplateSelector).content;
  const cardItem = cardTemplate.querySelector(cardTemplateconfig.cardItemSelector).cloneNode(true);

  const cardItemImage = cardItem.querySelector(cardTemplateconfig.cardItemImageSelector);
  const cardItemTitle = cardItem.querySelector(cardTemplateconfig.cardItemTitleSelector);
  const removeButton = cardItem.querySelector(cardTemplateconfig.removeButtonSelector);
  const likeButton = cardItem.querySelector(cardTemplateconfig.likeButtonSelector);

  cardItemImage.src = cardInfo.link;
  cardItemTitle.textContent = cardInfo.name;
  cardItemImage.alt = cardInfo.alt;

  removeButton.addEventListener("click", deleteCard);

  likeButton.addEventListener("click", likeCard);

  opencardImagePopup(cardItemImage, cardItemTitle);

  return cardItem;
}

function deleteCard(event) {
  event.target.closest(".card").remove();
}

function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

function opencardImagePopup(cardImage, cardTitle) {
  const popupImage = document.querySelector(".popup_type_image");
  const popupImagePic = popupImage.querySelector(".popup__image");
  const popupImageCap = popupImage.querySelector(".popup__caption");
  cardImage.addEventListener('click', function (event) {
    openPopup(popupImage);
    popupImagePic.src = event.target.src;
    popupImagePic.alt = event.target.alt;
    popupImageCap.textContent = cardTitle.textContent;
  });
}

export { getCard, deleteCard, likeCard, opencardImagePopup };
