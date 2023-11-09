function getCard(
  cardInfo,
  deleteCard,
  likeCard,
  openCardImagePopup,
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

  cardItemImage.src = cardInfo.link;
  cardItemTitle.textContent = cardInfo.name;
  cardItemImage.alt = cardInfo.name;

  removeButton.addEventListener("click", deleteCard);

  likeButton.addEventListener("click", likeCard);

  cardItemImage.addEventListener("click", openCardImagePopup);

  return cardItem;
}

function deleteCard(event) {
  event.target.closest(".card").remove();
}

function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export { getCard, deleteCard, likeCard };
