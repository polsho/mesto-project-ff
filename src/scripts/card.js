import { deleteElement, addCardLike, removeCardLike } from "./api.js";

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
    event.target.classList.toggle("card__like-button_is-active");
    if(event.target.classList.contains("card__like-button_is-active")) {
      addCardLike(cardItem.id)
      .then((card) => {
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

const likeCard = () => {

}

function deleteCard(event) {
  deleteElement(cardInfo._id);
  event.target.closest(".card").remove();
}


export { getCard, deleteCard, likeCard };
