import {openPopup} from './modal.js';

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

export {getCard, deleteCard, likeCard, openPopupImage};