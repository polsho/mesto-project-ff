import { mestoApi } from "./api.js";

export function getCard(
  cardInfo,
  likeCard,
  deleteCard,
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

  removeButton.addEventListener("click", () => {
    deleteCard(cardItem, cardInfo._id);
  });

  likeButton.addEventListener("click", () => {
    likeCard(likeButton, likesQty, cardItem.id, cardTemplateConfig);
  });

  cardItemImage.addEventListener("click", () => {
    openCardImagePopup(cardInfo.name, cardInfo.link);
  });

  return cardItem;
}

export function likeCard(
  likeButton,
  likesQty,
  cardId,
  { activeLikeButtonClass }
) {
  if (!likeButton.classList.contains(activeLikeButtonClass)) {
    mestoApi.addCardLike(cardId)
      .then((card) => {
        likesQty.textContent = card.likes.length;
        likeButton.classList.add(activeLikeButtonClass);
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
      });
  } else {
    mestoApi.removeCardLike(cardId)
      .then((card) => {
        likesQty.textContent = card.likes.length;
        likeButton.classList.remove(activeLikeButtonClass);
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
      });
  }
}

export function deleteCard(cardItem, cardId) {
  mestoApi.deleteCard(cardId)
    .then(() => {
      cardItem.remove();
    })
    .catch((err) => {
      console.log(`Ошибка.....: ${err}`);
    });
}
