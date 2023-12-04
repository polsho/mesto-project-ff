const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-1",
  headers: {
    authorization: "b3d60fc6-1639-4f5f-9902-e15faf6075dd",
    "Content-Type": "application/json",
  },
};

const getResponseData = (res) => {
  if(!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const getData = (url) => {
  return fetch(`${config.baseUrl}/${url}`, {
    headers: config.headers,
  })
    .then((res) => {
      return getResponseData(res);
    })
};

export const editUserData = (profileData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileData.title.textContent,
      about: profileData.description.textContent,
    }),
  });
};

export const postCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  })
    .then((res) => {
      return getResponseData(res);
    });
};

export const deleteElement = (id) => {
  fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const addCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      return getResponseData(res);
    });
};

export const removeCardLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      return getResponseData(res);
    });
};

export const editImage = (newAvatarSource) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatarSource.value,
    }),
  })
    .then((res) => {
      return getResponseData(res);
    });
};
