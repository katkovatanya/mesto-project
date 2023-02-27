//утилитарные функции, которые используются в работе сразу нескольких других функций
import { profileName, profileText, avatar } from './modal.js';
export let userId;

export const renderingProfile = (obj) => {
    profileName.textContent = obj.name;
    profileText.textContent = obj.about;
    avatar.src = obj.avatar;
    userId = obj._id;
}