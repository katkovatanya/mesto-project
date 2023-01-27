// массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const elements = document.querySelector('.elements');
// попапы
const profilePopup = document.querySelector('.profile-popup');
const popupElement = document.querySelector('.element-popup');
const popupImage = document.querySelector('.image-popup');
//форма профиля и её поля
const formProfilePopup = document.querySelector('.popup__form');
const nameInput = formProfilePopup.querySelector('[name="name-field"]');
const jobInput = formProfilePopup.querySelector('[name="text-field"]');
const profileEditButton = document.querySelector('.profile__edit-button');
const closeButtonProfile = document.querySelector('.popup__close-button');
const closeButtonElement = document.querySelector('.element-popup__close-button');
const imageCloseButton = document.querySelector('.popup__close-button_image');
//кнопка открытия формы добавления новой карточки
const plusButton = document.querySelector('.profile__add-button');
// Форма места и её поля
const formPlace = document.querySelector('.element-popup__form');
const namePlaceInput = document.querySelector('[name="name-place"]');
const linkPlaceInput = document.querySelector('[name="link-place"]');
const imagePopupCaption = popupImage.querySelector('.popup__caption');
const imagePopupPicture = popupImage.querySelector('.popup__image');
const closeButtons = document.querySelectorAll('.popup__close-button');

//функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//функция создания карточки
function createCard(elem) {
  const element = document.querySelector('#element').content;
  const cardElement = element.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  cardElement.querySelector('.element__name').textContent = elem.name;
  cardImage.src = elem.link;
  cardImage.alt = elem.name;
  //добавляем сразу слушатели событий для лайка и корзины
  const likeButton = cardElement.querySelector('.element__like-button');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle("element__like-button_active");
  });
  const deleteButton = cardElement.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', () => {
    const card = deleteButton.closest('.element');
    card.remove();
  });
  //добавляем функцию открытия попапа с картинкой
  const openImage = cardElement.querySelector('.element__open-button');
  openImage.addEventListener('click', () => {
    openPopup(popupImage);
    imagePopupPicture.src = elem.link;
    imagePopupPicture.alt = elem.name;
    imagePopupCaption.textContent = elem.name;
  });
  return cardElement;
}
//функция добавления карточки
function addCard(item) {
  const cardElement = createCard(item);
  elements.prepend(cardElement);
}

//загрузка на страницу карточек из массива
initialCards.forEach(addCard);

// функция для открытия формы редактирования профиля
function clickProfileEditButton() {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
}

profileEditButton.addEventListener('click', clickProfileEditButton);

//Функция открытия формы формы добавления новой карточки
function clickPlusButton() {
  openPopup(popupElement);
}

plusButton.addEventListener('click', clickPlusButton);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfilePopup.addEventListener('submit', handleProfileFormSubmit);

//отправка формы карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const card = {};
  card.name = namePlaceInput.value;
  card.link = linkPlaceInput.value;
  addCard(card);
  closePopup(popupElement);
  evt.target.reset();
}

formPlace.addEventListener('submit', handleCardFormSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});