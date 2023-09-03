const { log: l } = console;

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('nav.navbar');
  const sections = navbar.querySelectorAll(
    'label.step[for] input[type="radio"]',
  );
  const name = document.querySelector('label[for="name"]');
  const nameInput = name.querySelector('input');
  const email = document.querySelector('label[for="email"]');
  const emailInput = email.querySelector('input');
  const emailRegExp = new RegExp(/^[\w\.-]+@[\w\.-]+\.\w+$/);
  const phoneNumber = document.querySelector('label[for="phone-number"]');
  const phoneNumberInput = phoneNumber.querySelector('input');
  const phoneNumberRegExp = new RegExp(/^\d{10}$/);
  const nextBtn = document.querySelector('input[value="next step"]');

  sections[0].checked = true;

  document
    .querySelectorAll('label[for] input[type]')
    .forEach((field) => field.setAttribute('autocomplete', 'off'));
  nextBtn.disabled = true;

  emailInput.addEventListener('input', function ({ target: { value } }) {
    if (value.trim() && !emailRegExp.test(value)) {
      email.setAttribute('data-message', 'Invalid email format');
      return email.classList.add('error');
    }
    email.removeAttribute('data-message');
    return email.classList.remove('error');
  });
});
