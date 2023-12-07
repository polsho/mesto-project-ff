const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-1",
  headers: {
    authorization: "b3d60fc6-1639-4f5f-9902-e15faf6075dd",
    "Content-Type": "application/json",
  },
};

const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

const getData = (url) => {
  return fetch(`${config.baseUrl}/${url}`, {
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
};

const postData = (url, obj) => {
  return fetch(`${config.baseUrl}/${url}`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(obj),
  }).then((res) => {
    return getResponseData(res);
  });
}

const editElement = (url, obj) => {
  return fetch(`${config.baseUrl}/${url}`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(obj),
  }).then((res) => {
    return getResponseData(res);
  });
}

const deleteElement = (url, id) => {
  return fetch(`${config.baseUrl}/${url}/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
};

const addElement = (url, id) => {
  return fetch(`${config.baseUrl}/${url}/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
};

export const mestoApi = {
  getUserData: () => getData("users/me"),
  getCardsList: () => getData("cards"),
  addNewCard: (cardData) => postData("cards", {name: cardData.name, link: cardData.link}),
  deleteCard: (cardId) => deleteElement("cards", cardId),
  editUserData: (profileName, profileAbout) => editElement("users/me", {name: profileName, about: profileAbout}),
  editProfileAvatar: (newAvatarSource) => editElement("users/me/avatar", {avatar: newAvatarSource.value}),
  addCardLike: (cardId) => addElement("cards/likes", cardId),
  removeCardLike: (cardId) => deleteElement("cards/likes", cardId)
}