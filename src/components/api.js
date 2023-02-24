import { addCard } from './card.js';
import { profileName, profileText, createCardButton, closePopup, cardPopup, profilePopup, avatarPopup, avatarSaveButton, profileSubmitButton } from './modal.js';

export const avatar = document.querySelector('.profile__avatar');

export const getProfile = () => {
  fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me', {
    headers: {
      authorization: '83f87adb-6fb5-41e5-8ce5-f6fbadb1ae1c'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((result) => {
      profileName.textContent = result.name;
      profileText.textContent = result.about;
      avatar.src = result.avatar;
    })
    .catch((err) => {
      console.log(err);
    });
}


export const getInitialCards = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', {
    method: 'GET',
    headers: {
      authorization: '83f87adb-6fb5-41e5-8ce5-f6fbadb1ae1c'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      else {
        return Promise.reject(`Ошибка ${res.status}`)
      }
    })
    .then((result) => {
      let initialCards = Array.from(result.reverse());
      initialCards.forEach(elem => {
        addCard(elem);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

//функция отправки карточки на сервер
export const postCard = (elem) => {
  fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', {
    method: 'POST',
    headers: {
      authorization: '83f87adb-6fb5-41e5-8ce5-f6fbadb1ae1c',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: elem.name,
      link: elem.link,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then(res => {
      addCard(res);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      createCardButton.textContent = 'Создать';
      closePopup(cardPopup);
    })
}


export const deleteCard = (card) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/${card._id}`, {
    method: 'DELETE',
    headers: {
      authorization: '83f87adb-6fb5-41e5-8ce5-f6fbadb1ae1c'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

//редактирование профиля
export const editProfile = (nameInput, jobInput) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '83f87adb-6fb5-41e5-8ce5-f6fbadb1ae1c',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closePopup(profilePopup);
      profileSubmitButton.textContent = "Сохранить";
    })
}

export const editAvatar = (avatarInput) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '83f87adb-6fb5-41e5-8ce5-f6fbadb1ae1c',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarInput.value
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closePopup(avatarPopup);
      avatarSaveButton.textContent = "Сохранить";
    })
}

export const putLike = (card, newLikes, likes) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/likes/${card._id}`, {
    method: 'PUT',
    headers: {
      authorization: '83f87adb-6fb5-41e5-8ce5-f6fbadb1ae1c'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then(res => {
      newLikes = res;
      likes.textContent = newLikes.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

export const removeLike = (card, newLikes, likes) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-21/cards/likes/${card._id}`, {
    method: 'DELETE',
    headers: {
      authorization: '83f87adb-6fb5-41e5-8ce5-f6fbadb1ae1c'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then(res => {
      newLikes = res;
      likes.textContent = newLikes.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}