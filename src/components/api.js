export const apiConfig = {
  address: 'https://nomoreparties.co/v1/plus-cohort-21/',
  token: '83f87adb-6fb5-41e5-8ce5-f6fbadb1ae1c'
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const getProfile = (apiConfig) => {
  return fetch(apiConfig.address + 'users/me', {
    method: 'GET',
    headers: {
      authorization: apiConfig.token
    }
  })
    .then(res => checkResponse(res))
    .catch((err) => {
      console.log(err);
    });
}


export const getInitialCards = (apiConfig) => {
  return fetch(apiConfig.address + 'cards', {
    method: 'GET',
    headers: {
      authorization: apiConfig.token
    }
  })
    .then(res => checkResponse(res))
    .catch((err) => {
      console.log(err);
    });
}


//функция отправки карточки на сервер
export const postCard = (elem, apiConfig) => {
  return fetch(apiConfig.address + 'cards', {
    method: 'POST',
    headers: {
      authorization: apiConfig.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: elem.name,
      link: elem.link,
    })
  })
    .then(res => checkResponse(res))
}


export const deleteCard = (card, apiConfig) => {
  return fetch(apiConfig.address + `cards/${card._id}`, {
    method: 'DELETE',
    headers: {
      authorization: apiConfig.token
    }
  })
    .then(res => checkResponse(res))
}

//редактирование профиля
export const editProfile = (nameInput, jobInput, apiConfig) => {
  return fetch(apiConfig.address + 'users/me', {
    method: 'PATCH',
    headers: {
      authorization: apiConfig.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })
    .then(res => checkResponse(res))
}

export const editAvatar = (avatarInput, apiConfig) => {
  return fetch(apiConfig.address + 'users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: apiConfig.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarInput.value
    })
  })
    .then(res => checkResponse(res))
}

export const putLike = (card, apiConfig) => {
  return fetch(apiConfig.address + `cards/likes/${card._id}`, {
    method: 'PUT',
    headers: {
      authorization: apiConfig.token
    }
  })
    .then(res => checkResponse(res))
}

export const removeLike = (card, apiConfig) => {
  return fetch(apiConfig.address + `cards/likes/${card._id}`, {
    method: 'DELETE',
    headers: {
      authorization: apiConfig.token
    }
  })
    .then(res => checkResponse(res))
}