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

export const getData = (url) => {
  return fetch(`${config.baseUrl}/${url}`, {
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
};

export const editUserData = (profileName, profileAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileAbout,
    }),
  }).then((res) => {
    return getResponseData(res);
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
  }).then((res) => {
    return getResponseData(res);
  });
};

export const deleteElement = (url, id) => {
  return fetch(`${config.baseUrl}/${url}/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
};

export const addElement = (url, cardId) => {
  return fetch(`${config.baseUrl}/${url}/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
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
  }).then((res) => {
    return getResponseData(res);
  });
};
