let form$data = {
  user: { name: '', email: '', number: '' },
  subscription: {
    name: 'arcade',
    interval: 'monthly',
    price: function () {
      if (this.name === 'arcade') return this.interval === 'monthly' ? 9 : 90;
      else if (this.name === 'advanced')
        return this.interval === 'monthly' ? 12 : 120;
      else if (this.name === 'pro')
        return this.interval === 'monthly' ? 15 : 150;
      return null;
    },
    add$ons: [],
  },
};
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
          nextBtn.value = 'next step';
          return;

        case 'page-2':
          if (validateStep(1)) {
            step.forEach(
              (page) => (page.hidden = !page.classList.contains(value)),
            );
            goBkBtn.hidden = false;
            goBkBtn.disabled = false;
            nextBtn.value = 'next step';
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
            nextBtn.value = 'next step';
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
            nextBtn.value = 'Confirm';
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
        form$data = { ...form$data, user: { ...form$data.user, name: value } };

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
        form$data = { ...form$data, user: { ...form$data.user, email: value } };

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
          return;
        }
        form$data = {
          ...form$data,
          user: { ...form$data.user, number: value },
        };

        numberFieldWrapper.removeAttribute('data-message');
        numberFieldWrapper.classList.remove('error');
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
        nextBtn.value = +stepID === 3 ? 'confirm' : 'next step';
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
        target.value = +stepID === 3 ? 'confirm' : 'next step';
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

  const subs = document.querySelector('.subscriptions-container');
  subs.addEventListener('change', function ({ target: { value } }) {
    form$data = {
      ...form$data,
      subscription: { ...form$data.subscription, name: value },
    };
  });

  const subIntervalWrapper = document.querySelector('.subscription-interval');
  const monthlyToggle = subIntervalWrapper.querySelector('#monthly-interval');
  const intervalToggle = subIntervalWrapper.querySelector('button.toggle');
  const yearlyToggle = subIntervalWrapper.querySelector('#yearly-interval');
  const addOnsMonthlyPrice = document.querySelectorAll(
    '.add-on__price .monthly-price',
  );
  const addOnsYearlyPrice = document.querySelectorAll(
    '.add-on__price .yearly-price',
  );

  subIntervalWrapper.addEventListener(
    'change',
    function ({ target: { value } }) {
      if (value === 'monthly') {
        intervalToggle.classList.remove('toggled');
        form$data = {
          ...form$data,
          subscription: { ...form$data.subscription, interval: value },
        };

        promoText.forEach(function (text, i) {
          text.hidden = true;
          yearlyPrice[i].hidden = true;
          monthlyPrice[i].hidden = false;
        });
        addOnsMonthlyPrice.forEach(function (price, j) {
          price.hidden = false;
          addOnsYearlyPrice[j].hidden = true;
        });
        return;
      }
      intervalToggle.classList.add('toggled');
      form$data = {
        ...form$data,
        subscription: { ...form$data.subscription, interval: value },
      };

      promoText.forEach(function (text, i) {
        text.hidden = false;
        yearlyPrice[i].hidden = false;
        monthlyPrice[i].hidden = true;
      });
      addOnsMonthlyPrice.forEach(function (price, j) {
        price.hidden = true;
        addOnsYearlyPrice[j].hidden = false;
      });
    },
  );

  intervalToggle.addEventListener('click', function ({ target }) {
    target.classList.toggle('toggled');
    if (target.classList.contains('toggled')) {
      form$data = {
        ...form$data,
        subscription: { ...form$data.subscription, interval: 'yearly' },
      };

      monthlyToggle.checked = false;
      yearlyToggle.checked = true;
      promoText.forEach(function (text, i) {
        text.hidden = false;
        yearlyPrice[i].hidden = false;
        monthlyPrice[i].hidden = true;
      });
      return;
    }
    form$data = {
      ...form$data,
      subscription: { ...form$data.subscription, interval: 'monthly' },
    };

    monthlyToggle.checked = true;
    yearlyToggle.checked = false;
    promoText.forEach(function (text, i) {
      text.hidden = true;
      yearlyPrice[i].hidden = true;
      monthlyPrice[i].hidden = false;
    });
  });

  const chngBtn = document.querySelector(
    '.page-4 .invoice .base .selected li input[type="button"][value="change"]#change-selection',
  );

  const selected$option = document.querySelector('.selected__option');
  const selected$interval = document.querySelector('.selected__interval');
  const selection$price = document.querySelector('.selection-price span');

  selected$option.innerHTML = form$data.subscription.name;
  selected$interval.innerHTML = form$data.subscription.interval;
  selection$price.innerHTML = `${form$data.subscription.price()}/${
    form$data.subscription.interval === 'monthly' ? 'mo' : 'yr'
  }`;
});
