const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-1",
  headers: {
    authorization: "b3d60fc6-1639-4f5f-9902-e15faf6075dd",
    "Content-Type": "application/json",
  },
};

export const getData = (url) => {
  return fetch(`${config.baseUrl}/${url}`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); 
    });
}

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); 
  });
};

export const patchProfile = (profileData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: 'b3d60fc6-1639-4f5f-9902-e15faf6075dd',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profileData.title.textContent,
      about: profileData.description.textContent,
    })
  });
}

export const postCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: 'b3d60fc6-1639-4f5f-9902-e15faf6075dd',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    })
  });
}

export const deleteElement = (id) => {
  fetch(`${config.baseUrl}/cards/${id}`, {
      method: 'DELETE'
    })
}