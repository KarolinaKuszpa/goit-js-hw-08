import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const localStorageKey = 'feedback-form-state';

// zapisujemy stan formularza w local storage
const saveStateToLocalStorage = () => {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(state));
};

// odczytujemy stan formularza z local storage
const loadStateFromLocalStorage = () => {
  const state = JSON.parse(localStorage.getItem(localStorageKey));
  if (state) {
    emailInput.value = state.email;
    messageInput.value = state.message;
  }
};

// usuwamy stan formularza z local storage
const clearStateFromLocalStorage = () => {
  localStorage.removeItem(localStorageKey);
};

// aktualizujemy stan formularza w local storage nie częściej niż raz na 500ms
const throttledSaveStateToLocalStorage = throttle(saveStateToLocalStorage, 500);

// nasłuchujemy zdarzeń input i zapisujemy stan formularza w local storage
form.addEventListener('input', throttledSaveStateToLocalStorage);

// po załadowaniu strony odczytujemy stan formularza z local storage
window.addEventListener('load', loadStateFromLocalStorage);

// po wysłaniu formularza czyścimy stan formularza i local storage
form.addEventListener('submit', event => {
  event.preventDefault();
  clearStateFromLocalStorage();
  emailInput.value = '';
  messageInput.value = '';
  console.log('Form submitted:', {
    email: emailInput.value,
    message: messageInput.value,
  });
});
