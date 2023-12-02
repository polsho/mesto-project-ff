import { deleteElement } from "./scripts/api.js";

function getCard(
  cardInfo,
  deleteCard,
  likeCard,
  openCardImagePopup,
  profileData,
  cardTemplateConfig
) {
  const cardTemplate = document.querySelector(
    cardTemplateConfig.cardTemplateSelector
  ).content;
  const cardItem = cardTemplate
    .querySelector(cardTemplateConfig.cardItemSelector)
    .cloneNode(true);

  const cardItemImage = cardItem.querySelector(
    cardTemplateConfig.cardItemImageSelector
  );
  const cardItemTitle = cardItem.querySelector(
    cardTemplateConfig.cardItemTitleSelector
  );
  const removeButton = cardItem.querySelector(
    cardTemplateConfig.removeButtonSelector
  );
  const likeButton = cardItem.querySelector(
    cardTemplateConfig.likeButtonSelector
  );
  const likesQty = cardItem.querySelector(
    cardTemplateConfig.likesQtySelector
  );

  if (cardInfo.owner._id != profileData.id) {
    removeButton.style.display = 'none';
  }

  cardItemImage.src = cardInfo.link;
  cardItemTitle.textContent = cardInfo.name;
  cardItemImage.alt = cardInfo.name;
  likesQty.textContent = cardInfo.likes.length;

  removeButton.addEventListener("click", deleteCard);

  likeButton.addEventListener("click", likeCard);

  cardItemImage.addEventListener("click", openCardImagePopup);

  return cardItem;
}

function deleteCard(event) {
  event.preventDefault();

  deleteElement(cardInfo._id);
  // event.target.closest(".card").remove();
}

function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export { getCard, deleteCard, likeCard };
