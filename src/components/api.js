import { addCard, removeLikeDOM, putLikeDOM } from './card.js';
import { createCardButton, closePopup, cardPopup, profilePopup, avatarPopup, avatarSaveButton, profileSubmitButton } from './modal.js';
import { renderingProfile } from './utils.js';

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
  fetch(apiConfig.address + 'cards', {
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
    .then(res => {
      addCard(res);
      closePopup(cardPopup);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      createCardButton.textContent = 'Создать';
    })
}


export const deleteCard = (card, apiConfig, elem) => {
  return fetch(apiConfig.address + `cards/${card._id}`, {
    method: 'DELETE',
    headers: {
      authorization: apiConfig.token
    }
  })
    .then(res => checkResponse(res))
    .then(res => {
      console.log(res);
      elem.remove()
    })
    .catch((err) => {
      console.log(err);
    });
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
    .then((res) => {
      renderingProfile(res);
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileSubmitButton.textContent = "Сохранить";
    })
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
    .then((res) => {
      renderingProfile(res);
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarSaveButton.textContent = "Сохранить";
    })
}

export const putLike = (card, newLikes, likes, apiConfig, likeButton) => {
  return fetch(apiConfig.address + `cards/likes/${card._id}`, {
    method: 'PUT',
    headers: {
      authorization: apiConfig.token
    }
  })
    .then(res => checkResponse(res))
    .then(res => {
      putLikeDOM(likes, res, likeButton)
    })
    .catch((err) => {
      console.log(err);
    });
}

export const removeLike = (card, newLikes, likes, apiConfig, likeButton) => {
  return fetch(apiConfig.address + `cards/likes/${card._id}`, {
    method: 'DELETE',
    headers: {
      authorization: apiConfig.token
    }
  })
    .then(res => checkResponse(res))
    .then(res => {
      removeLikeDOM(likes, res, likeButton)
    })
    .catch((err) => {
      console.log(err);
    });
}