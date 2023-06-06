import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

// Зберігання значень полів у локальне сховище
const saveFormState = () => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

// Оновлення полів форми за збереженими значеннями з локального сховища
const updateFormState = () => {
  const savedFormData = localStorage.getItem(STORAGE_KEY);
  if (savedFormData) {
    const formData = JSON.parse(savedFormData);
    emailInput.value = formData.email || '';
    messageInput.value = formData.message || '';
  }
};

// Очищення локального сховища та полів форми
const clearFormState = () => {
  localStorage.removeItem(STORAGE_KEY);
  emailInput.value = '';
  messageInput.value = '';
};

// Обробник події input - збереження значень полів у сховище
const handleInput = throttle(saveFormState, 500);

// Обробка подій форми
form.addEventListener('input', handleInput);
form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formData);
  clearFormState();
});

// Заповнення полів форми зі збереженими значеннями під час завантаження сторінки
document.addEventListener('DOMContentLoaded', updateFormState);
