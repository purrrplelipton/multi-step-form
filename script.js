const { log } = console;

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('nav.navbar');
  const radio = navbar.querySelectorAll('label[for].step [type="radio"]');
  const step = document.querySelectorAll('div[class^="page-"');
  const nameFieldWrapper = document.querySelector('.field-wrapper.name');
  const nameField = nameFieldWrapper.querySelector('input#name');
  const nameRegExp = new RegExp(/^[A-Za-z]{2,}(?:[-\s][A-Za-z]+)*$/);
  const emailFieldWrapper = document.querySelector('.field-wrapper.email');
  const emailField = emailFieldWrapper.querySelector('input#email');
  const emailRegExp = new RegExp(/^[\w\.-]+@[\w\.-]+\.\w+$/);
  const numberFieldWrapper = document.querySelector('.field-wrapper.phone');
  const numberField = numberFieldWrapper.querySelector('input#phone');
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

  radio[0].addEventListener('change', function () {
    step.forEach((page) => (page.hidden = page === step[0] ? false : true));
    goBkBtn.hidden = true;
    goBkBtn.disabled = true;
  });

  radio[1].addEventListener('change', function () {
    if (!validateFields()) {
      radio.forEach(
        (step) => (step.checked = step === radio[0] ? true : false),
      );
      return;
    }
    goBkBtn.hidden = false;
    goBkBtn.disabled = false;
    step.forEach((page) => (page.hidden = page === step[1] ? false : true));
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

  nextBtn.addEventListener('click', function (_e) {
    const hiddenStates = [...step].map((page) => page.hidden);
  });

  const monthlyPrice = document.querySelectorAll(
    '.subscription-option .monthly-price',
  );
  const yearlyPrice = document.querySelectorAll(
    '.subscription-option .yearly-price',
  );
  const promoText = document.querySelectorAll(
    '.subscription-option .yearly-promo',
  );

  const subIntervalWrapper = document.querySelector('.subscription-interval');
  const monthlyToggle = subIntervalWrapper.querySelector('#monthly-interval');
  const intervalToggle = subIntervalWrapper.querySelector('button.toggle');
  const yearlyToggle = subIntervalWrapper.querySelector('#yearly-interval');

  subIntervalWrapper.addEventListener(
    'change',
    function ({ target: { value } }) {
      if (value === 'monthly') {
        intervalToggle.classList.remove('toggled');
        promoText.forEach(function (text, i) {
          text.hidden = true;
          yearlyPrice[i].hidden = true;
          monthlyPrice[i].hidden = false;
        });
        return;
      }
      intervalToggle.classList.add('toggled');
      promoText.forEach(function (text, i) {
        text.hidden = false;
        yearlyPrice[i].hidden = false;
        monthlyPrice[i].hidden = true;
      });
    },
  );

  intervalToggle.addEventListener('click', function ({ target }) {
    target.classList.toggle('toggled');
    if (target.classList.contains('toggled')) {
      monthlyToggle.checked = false;
      yearlyToggle.checked = true;
      promoText.forEach(function (text, i) {
        text.hidden = false;
        yearlyPrice[i].hidden = false;
        monthlyPrice[i].hidden = true;
      });
      return;
    }
    monthlyToggle.checked = true;
    yearlyToggle.checked = false;
    promoText.forEach(function (text, i) {
      text.hidden = true;
      yearlyPrice[i].hidden = true;
      monthlyPrice[i].hidden = false;
    });
  });
});
