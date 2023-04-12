import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const localStorageKey = 'feedback-form-state';

const stateToLocalStorage = () => {
  const state = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(state));
};

const loadLocalStorage = () => {
  const state = JSON.parse(localStorage.getItem(localStorageKey));
  if (state) {
    email.value = state.email;
    message.value = state.message;
  }
};

const clearFormLocalStorage = () => {
  localStorage.removeItem(localStorageKey);
};

const throttledLocalStorage = throttle(stateToLocalStorage, 500);

form.addEventListener('input', throttledLocalStorage);

window.addEventListener('load', loadLocalStorage);

form.addEventListener('submit', event => {
  event.preventDefault();
  clearFormLocalStorage();
  email.value = '';
  message.value = '';
  console.log('Form submitted:', {
    email: email.value,
    message: message.value,
  });
});
