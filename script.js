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

  function validateStep(step) {
    switch (step) {
      case 1:
        return (
          nameField.value.trim() &&
          nameRegExp.test(nameField.value) &&
          emailField.value.trim() &&
          emailRegExp.test(emailField.value) &&
          numberField.value.trim() &&
          phoneNumberRegExp.test(numberField.value)
        );

      default:
        return false;
    }
  }

  radio.forEach(function (stepRadio) {
    stepRadio.addEventListener('change', function (evt) {
      const { target } = evt;
      const { value } = target;
      switch (value) {
        case 'page-1':
          step.forEach(
            (page) => (page.hidden = !page.classList.contains(value)),
          );
          goBkBtn.hidden = true;
          goBkBtn.disabled = true;
          return;

        case 'page-2':
          if (validateStep(1)) {
            step.forEach(
              (page) => (page.hidden = !page.classList.contains(value)),
            );
            goBkBtn.hidden = false;
            goBkBtn.disabled = false;
            return;
          }
          radio.forEach((rd) => (rd.checked = rd.value === 'page-1'));

          return;

        case 'page-3':
          if (validateStep(1)) {
            step.forEach(
              (page) => (page.hidden = !page.classList.contains(value)),
            );
            goBkBtn.hidden = false;
            goBkBtn.disabled = false;
            return;
          }
          radio.forEach((rd) => (rd.checked = rd.value === 'page-1'));

          return;

        case 'page-4':
          if (validateStep(1)) {
            step.forEach(
              (page) => (page.hidden = !page.classList.contains(value)),
            );
            goBkBtn.hidden = false;
            goBkBtn.disabled = false;
            return;
          }
          radio.forEach((rd) => (rd.checked = rd.value === 'page-1'));

          return;

        default:
          return;
      }
    });
  });

  nameField.addEventListener('input', function ({ target: { value } }) {
    return setTimeout(function () {
      nextBtn.disabled = !validateStep(1);
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
      nextBtn.disabled = !validateStep(1);
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
      nextBtn.disabled = !validateStep(1);
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

  goBkBtn.addEventListener('click', function ({ target }) {
    const currentStep = navbar.querySelector(
      'input[type="radio"][name="step-picker"]:checked',
    );

    if (currentStep) {
      const stepID = currentStep.getAttribute('id').replace('step-', '');

      if (validateStep(1)) {
        step.forEach((page, i) => {
          page.hidden = !(i === +stepID - 2);
          radio[i].checked = i === +stepID - 2;
        });
        if (+stepID === 2) {
          target.disabled = true;
          target.hidden = true;
        }
      }
    }
  });

  nextBtn.addEventListener('click', function ({ target }) {
    const currentStep = navbar.querySelector(
      'input[type="radio"][name="step-picker"]:checked',
    );

    if (currentStep) {
      const stepID = currentStep.getAttribute('id').replace('step-', '');

      if (validateStep(1)) {
        step.forEach((page, i) => {
          page.hidden = !(i === +stepID);
          radio[i].checked = i === +stepID;
        });
        if (+stepID === 1) {
          goBkBtn.disabled = false;
          goBkBtn.hidden = false;
        }
      }
    }
  });

  const monthlyPrice = document.querySelectorAll('.sub-price .monthly-price');
  const yearlyPrice = document.querySelectorAll('.sub-price .yearly-price');
  const promoText = document.querySelectorAll('.subscription-option .discount');

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
