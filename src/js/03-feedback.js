import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');
const localStorageKey = 'feedback-form-state';

const stateToLocalStorage = () => {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(state));
};

const loadLocalStorage = () => {
  const state = JSON.parse(localStorage.getItem(localStorageKey));
  if (state) {
    emailInput.value = state.email;
    messageInput.value = state.message;
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
  emailInput.value = '';
  messageInput.value = '';
  console.log('Form submitted:', {
    email: emailInput.value,
    message: messageInput.value,
  });
});
