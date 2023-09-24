import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

function saveForm() {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function savedFormState() {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
}
emailInput.addEventListener('input', throttle(saveForm, 500));
messageTextarea.addEventListener('input', throttle(saveForm, 500));

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageTextarea.value = '';

  console.log(formData);
});

savedFormState();
