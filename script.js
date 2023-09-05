const { log: l } = console;

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('nav.navbar');
  const radios = navbar.querySelectorAll('label[for].step [type="radio"]');
  const step1 = radios[0],
    step2 = radios[1],
    step3 = radios[2],
    step4 = radios[3];
  const nameFieldWrapper = document.querySelector('.field-wrapper.name');
  const nameField = nameFieldWrapper.querySelector('input#name');
  const nameRegExp = new RegExp(/^[A-Za-z]{2,}(?:[-\s][A-Za-z]+)*$/);
  const emailFieldWrapper = document.querySelector(
    '.field-wrapper.email-address',
  );
  const emailField = emailFieldWrapper.querySelector('input#email-address');
  const emailRegExp = new RegExp(/^[\w\.-]+@[\w\.-]+\.\w+$/);
  const numberFieldWrapper = document.querySelector(
    '.field-wrapper.phone-number',
  );
  const numberField = numberFieldWrapper.querySelector('input#phone-number');
  const phoneNumberRegExp = new RegExp(/^\d{11}$/);
  const goBkBtn = document.querySelector('input[value="go back"]');
  const nextBtn = document.querySelector('input[value="next step"]');

  const validateFields = () =>
    nameField.value.trim() &&
    nameRegExp.test(nameField.value) &&
    emailField.value.trim() &&
    emailRegExp.test(emailField.value) &&
    numberField.value.trim() &&
    phoneNumberRegExp.test(numberField.value);

  step2.addEventListener('change', function () {
    [
      document.querySelector('div.page-2'),
      document.querySelector('div.page-3'),
      document.querySelector('div.page-4'),
      document.querySelector('div.page-5'),
    ].forEach((step) => (step.hidden = true));
    goBkBtn.hidden = true;
    goBkBtn.disabled = true;
    document.querySelector('div.page-1').hidden = false;
  });

  step2.addEventListener('change', function () {
    if (!validateFields()) {
      step1.checked = true;
      return (step2.checked = false);
    }
    goBkBtn.hidden = false;
    goBkBtn.disabled = false;
    document.querySelector('div.page-1').hidden = true;
    document.querySelector('div.page-2').hidden = false;
  });

  nameField.addEventListener('input', function ({ target: { value } }) {
    return setTimeout(function () {
      nextBtn.disabled = !validateFields();
      setTimeout(function () {
        if (value.trim() && !nameRegExp.test(value)) {
          nameFieldWrapper.setAttribute('data-message', 'Invalid name format');
          return nameFieldWrapper.classList.add('error');
        }
        nameFieldWrapper.removeAttribute('data-message');
        return nameFieldWrapper.classList.remove('error');
      }, 400);
    }, 100);
  });

  emailField.addEventListener('input', function ({ target: { value } }) {
    return setTimeout(function () {
      nextBtn.disabled = !validateFields();
      setTimeout(function () {
        if (value.trim() && !emailRegExp.test(value)) {
          emailFieldWrapper.setAttribute(
            'data-message',
            'Invalid email format',
          );
          return emailFieldWrapper.classList.add('error');
        }
        emailFieldWrapper.removeAttribute('data-message');
        return emailFieldWrapper.classList.remove('error');
      }, 400);
    }, 100);
  });

  numberField.addEventListener('input', function ({ target: { value } }) {
    return setTimeout(function () {
      nextBtn.disabled = !validateFields();
      setTimeout(function () {
        if (value.trim() && !phoneNumberRegExp.test(value)) {
          numberFieldWrapper.setAttribute(
            'data-message',
            'Invalid phone number format',
          );
          numberFieldWrapper.classList.add('error');
        } else {
          numberFieldWrapper.removeAttribute('data-message');
          numberFieldWrapper.classList.remove('error');
        }
      }, 400);
    }, 100);
  });

  nextBtn.addEventListener('click', function (e) {
    if (!validateFields()) return e.preventDefault();
  });
});
