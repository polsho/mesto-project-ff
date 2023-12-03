import { deleteElement, addCardLike, removeCardLike } from "./api.js";

export function getCard(
  cardInfo,
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
  const likesQty = cardItem.querySelector(cardTemplateConfig.likesQtySelector);

  if (cardInfo.owner._id != profileData.id) {
    removeButton.style.display = "none";
  }

  cardInfo.likes.forEach((like) => {
    if (like._id === profileData.id) {
      likeButton.classList.add(cardTemplateConfig.activeLikeButtonClass);
    }
  });

  cardItem.id = cardInfo._id;
  cardItemImage.src = cardInfo.link;
  cardItemTitle.textContent = cardInfo.name;
  cardItemImage.alt = cardInfo.name;
  likesQty.textContent = cardInfo.likes.length;

  removeButton.addEventListener("click", (event) => {
    deleteElement(cardInfo._id);
    event.target.closest(".card").remove();
  });

  likeButton.addEventListener("click", (event) => {
    event.target.classList.toggle(cardTemplateConfig.activeLikeButtonClass);
    if (event.target.classList.contains(cardTemplateConfig.activeLikeButtonClass)) {
      addCardLike(cardItem.id).then((card) => {
        likesQty.textContent = card.likes.length;
      });
    } else {
      removeCardLike(cardItem.id).then((card) => {
        likesQty.textContent = card.likes.length;
      });
    }
  });

  cardItemImage.addEventListener("click", openCardImagePopup);

  return cardItem;
}
