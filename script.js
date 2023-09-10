const { log } = console;

// Elements related to navigation
const navbar = document.querySelector("nav.navbar");
const radioButtons = navbar.querySelectorAll("label.step input");
const stepPages = document.querySelectorAll('[class^="page-"');

// Form input fields and wrappers
const nameInput = {
  wrapper: document.querySelector(".field-wrapper.name"),
  field: document.querySelector("#name"),
};

const emailInput = {
  wrapper: document.querySelector(".field-wrapper.email"),
  field: document.querySelector("#email"),
};

const numberInput = {
  wrapper: document.querySelector(".field-wrapper.phone"),
  field: document.querySelector("#phone"),
};

// Buttons
const goBackButton = document.querySelector(
  '.footer [type="button"]:first-child'
);
const nextButton = document.querySelector('.footer [type="button"]:last-child');
const changeSelectionButton = document.querySelector(
  ".page-4 #change-selection"
);

// Subscription-related elements
const discountElements = document.querySelectorAll(
  ".subscription-option .discount"
);
const subscriptionContainer = document.querySelector(
  ".subscriptions-container"
);
const intervalContainer = document.querySelector(".subscription-interval");

const subscriptionInterval = {
  monthly: intervalContainer.querySelector("#monthly-interval"),
  toggle: intervalContainer.querySelector(".toggle"),
  yearly: intervalContainer.querySelector("#yearly-interval"),
};

const subscriptionPrice = {
  monthly: document.querySelectorAll(".sub-price .monthly-price"),
  yearly: document.querySelectorAll(".sub-price .yearly-price"),
};

const addOnsContainer = document.querySelector(".page-3 .add-ons");

const addOnsPrice = {
  monthly: document.querySelectorAll(".add-on__price .monthly-price"),
  yearly: document.querySelectorAll(".add-on__price .yearly-price"),
};

// Regular expressions
const nameRegExp = /^[A-Z][a-zA-Z]*\s[A-Z][a-zA-Z]*$/;
const emailRegExp = /^[\w\.-]+@[\w\.-]+\.\w+$/;
const numberRegExp = /^\d{11}$/;

// Summary
const selected = {
  option: document.querySelector(".invoice .selected__option"),
  interval: document.querySelector(".invoice .selected__interval"),
  price: document.querySelector(".invoice .selection-price span"),
  addOns: document.querySelector(".invoice .add-ons"),
};

const total = {
  interval: document.querySelector(".total .interval"),
  price: document.querySelector(".total .price"),
};

let user = {
  name: "",
  email: "",
  number: "",
  subscription: {
    id: "arcade",
    interval: "monthly",
    price: function () {
      if (this.id === "arcade") return this.interval === "monthly" ? 9 : 90;
      else if (this.id === "advanced")
        return this.interval === "monthly" ? 12 : 120;
      else if (this.id === "pro") return this.interval === "monthly" ? 15 : 150;
      return null;
    },
    addOns: [],
  },
};

function validateInput(inputField, regex) {
  const value = inputField.value.trim();
  const wrapper = inputField.parentElement;
  const isValid = regex.test(value);
  const message = isValid ? "" : "Invalid format";

  wrapper.setAttribute("data-message", message);
  wrapper.classList.toggle("error", !isValid);

  return isValid;
}

function updateUserData(key, value) {
  if (key in user.subscription) user.subscription[key] = value;
  else user[key] = value;
}

function validateStep(step) {
  switch (step) {
    case 1:
      return (
        nameInput.field.value.trim() &&
        nameRegExp.test(nameInput.field.value) &&
        emailInput.field.value.trim() &&
        emailRegExp.test(emailInput.field.value) &&
        numberInput.field.value.trim() &&
        numberRegExp.test(numberInput.field.value)
      );

    default:
      return false;
  }
}

for (let i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener("change", ({ target: { value } }) => {
    switch (value) {
      case "page-1":
        for (let j = 0; j < stepPages.length; j++) {
          stepPages[j].hidden = !stepPages[j].classList.contains(value);
        }
        goBackButton.hidden = true;
        goBackButton.disabled = goBackButton.hidden;
        nextButton.value = "next step";
        return;

      case "page-2":
        if (validateStep(1)) {
          for (let j = 0; j < stepPages.length; j++) {
            stepPages[j].hidden = !stepPages[j].classList.contains(value);
          }
          goBackButton.hidden = false;
          goBackButton.disabled = goBackButton.hidden;
          nextButton.value = "next step";
          return;
        }
        for (let j = 0; j < radioButtons.length; j++) {
          radioButtons[j].checked = radioButtons[j].value === "page-1";
        }

        return;

      case "page-3":
        if (validateStep(1)) {
          for (let j = 0; j < stepPages.length; j++) {
            stepPages[j].hidden = !stepPages[j].classList.contains(value);
          }
          goBackButton.hidden = false;
          goBackButton.disabled = goBackButton.hidden;
          nextButton.value = "next step";
          return;
        }
        for (let i = 0; i < radioButtons.length; i++) {
          radioButtons[i].checked = radioButtons[i].value === "page-1";
        }

        return;

      case "page-4":
        if (validateStep(1)) {
          for (let j = 0; j < stepPages.length; j++) {
            stepPages[j].hidden = !stepPages[j].classList.contains(value);
          }
          goBackButton.hidden = false;
          goBackButton.disabled = goBackButton.hidden;
          nextButton.value = "confirm";
          selected.option.textContent = user.subscription.id;
          selected.interval.textContent = user.subscription.interval;
          selected.price.textContent = `${user.subscription.price()}/${
            user.subscription.interval === "monthly" ? "mo" : "yr"
          }`;
          for (let i = 0; i < user.subscription.addOns.length; i++) {
            const value = user.subscription.addOns[i].value;
            const formattedValue = value.replace(/\W/g, "&nbsp;");
            const addOn = document.createElement("li");
            addOn.innerHTML = `<p class="add-on__name">${formattedValue}</p><p>+$<span class="add-on__price"></span></p>`;
            selected.addOns.appendChild(addOn);
          }
          total.interval.textContent = user.subscription.interval.replace(
            /ly$/,
            ""
          );
          return;
        }
        for (let i = 0; i < radioButtons.length; i++) {
          radioButtons[i].checked = radioButtons[i].value === "page-1";
        }

        return;

      default:
        return;
    }
  });
}

nameInput.field.addEventListener("input", ({ target: { value } }) => {
  nextButton.disabled = !validateStep(1);
  return setTimeout(() => {
    const isValid = validateInput(nameInput.field, nameRegExp);
    if (isValid) updateUserData("name", value);
  }, 500);
});

emailInput.field.addEventListener("input", ({ target: { value } }) => {
  nextButton.disabled = !validateStep(1);
  return setTimeout(() => {
    const isValid = validateInput(emailInput.field, emailRegExp);
    if (isValid) updateUserData("email", value);
  }, 500);
});

numberInput.field.addEventListener("input", ({ target: { value } }) => {
  nextButton.disabled = !validateStep(1);
  return setTimeout(() => {
    const isValid = validateInput(numberInput.field, numberRegExp);
    if (isValid) updateUserData("number", value);
  }, 500);
});

goBackButton.addEventListener("click", ({ target }) => {
  const currentStep = navbar
    ?.querySelector("input:checked")
    ?.value?.replace("page-", "");

  if (validateStep(1)) {
    for (let i = 0; i < stepPages.length; i++) {
      stepPages[i].hidden = !(i === +currentStep - 2);
      radioButtons[i].checked = i === +currentStep - 2;
    }
    if (+currentStep === 4) nextButton.value = "next step";
    if (+currentStep === 2) {
      target.disabled = true;
      target.hidden = target.disabled;
    }
  }
});

nextButton.addEventListener("click", ({ target }) => {
  const currentStep = navbar
    ?.querySelector("input:checked")
    ?.value?.replace("page-", "");

  if (validateStep(1)) {
    for (let i = 0; i < stepPages.length; i++) {
      stepPages[i].hidden = !(i === +currentStep);
      radioButtons[i].checked = i === +currentStep;
    }
    target.value = +currentStep === 3 ? "confirm" : "next step";
    if (+currentStep === 3) {
      selected.option.textContent = user.subscription.id;
      selected.interval.textContent = user.subscription.interval;
      selected.price.textContent = `${user.subscription.price()}/${
        user.subscription.interval === "monthly" ? "mo" : "yr"
      }`;
      for (let i = 0; i < user.subscription.addOns.length; i++) {
        const value = user.subscription.addOns[i].value;
        const formattedValue = value.replace(/\W/g, "&nbsp;");
        const addOn = document.createElement("li");
        addOn.innerHTML = `<p class="add-on__name">${formattedValue}</p><p>+$<span class="add-on__price"></span></p>`;
        selected.addOns.appendChild(addOn);
      }
      total.interval.textContent = user.subscription.interval.replace(
        /ly$/,
        ""
      );
    }
    if (+currentStep === 1) {
      goBackButton.disabled = false;
      goBackButton.hidden = goBackButton.disabled;
    }
  }
});

changeSelectionButton.addEventListener("click", () => {
  for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].checked = radioButtons[i].value === "page-2";
    stepPages[i].hidden = !stepPages[i].classList.contains("page-2");
  }
  nextButton.value = "next step";
});

subscriptionContainer.addEventListener("change", ({ target: { value } }) =>
  updateUserData("id", value)
);

intervalContainer.addEventListener("change", ({ target: { value } }) => {
  if (value === "monthly") {
    subscriptionInterval.toggle.classList.remove("toggled");
    updateUserData("interval", value);

    for (let i = 0; i < discountElements.length; i++) {
      discountElements[i].hidden = true;
      subscriptionPrice.yearly[i].hidden = true;
      addOnsPrice.yearly[i].hidden = true;
      subscriptionPrice.monthly[i].hidden = !subscriptionPrice.yearly[i].hidden;
      addOnsPrice.monthly[i].hidden = !addOnsPrice.yearly[i].hidden;
    }
    return;
  }
  subscriptionInterval.toggle.classList.add("toggled");
  updateUserData("interval", value);

  for (let i = 0; i < discountElements.length; i++) {
    discountElements[i].hidden = false;
    subscriptionPrice.monthly[i].hidden = true;
    addOnsPrice.monthly[i].hidden = true;
    subscriptionPrice.yearly[i].hidden = !subscriptionPrice.monthly[i].hidden;
    addOnsPrice.yearly[i].hidden = !addOnsPrice.monthly[i].hidden;
  }
});

subscriptionInterval.toggle.addEventListener("click", ({ target }) => {
  target.classList.toggle("toggled");
  if (target.classList.contains("toggled")) {
    updateUserData("interval", "yearly");
    subscriptionInterval.monthly.checked = false;
    subscriptionInterval.yearly.checked = !subscriptionInterval.monthly.checked;
    for (let i = 0; i < discountElements.length; i++) {
      discountElements[i].hidden = false;
      subscriptionPrice.monthly[i].hidden = true;
      subscriptionPrice.yearly[i].hidden = !subscriptionPrice.monthly[i].hidden;
    }
    return;
  }
  updateUserData("interval", "monthly");
  subscriptionInterval.yearly.checked = true;
  subscriptionInterval.monthly.checked = !subscriptionInterval.yearly.checked;
  for (let i = 0; i < discountElements.length; i++) {
    discountElements[i].hidden = true;
    subscriptionPrice.yearly[i].hidden = true;
    subscriptionPrice.monthly[i].hidden = !subscriptionPrice.yearly[i].hidden;
  }
});

updateUserData(
  "addOns",
  document?.querySelectorAll(".page-3 .add-ons input:checked")
);

addOnsContainer.addEventListener("change", ({ currentTarget }) =>
  updateUserData("addOns", currentTarget.querySelectorAll(":checked"))
);
