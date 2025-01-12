const form = document.querySelector("form");

const email = document.getElementById("email");
const queryTypeButtons = document.querySelectorAll(".query-type");
const consentCheckbox = document.getElementById("consent-checkbox");

const queryTypeRequired = document.querySelector(".query-type-required");
const consentCheckboxRequired = document.querySelector(".consent-checkbox-required");

const submitBtn = document.querySelector(".submit-btn");
const successDiv = document.querySelector(".success-div");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateInput(inputType) {
    const input = document.getElementById(inputType)
    const inputRequired = document.querySelector(`.${inputType}-required`);

    if (input.value) {
        inputRequired.style.display = "none";
        return true;
    }

    else {
        inputRequired.style.display = "inline";
        return false;
    }
}

function validateEmail(email) {
    const emailRequired = document.querySelector(".email-required");

    if (!email.value) {
        emailRequired.style.display = "inline";
        return false;
    }

    if (emailRegex.test(email.value)) {
        emailRequired.style.display = "none";
        return true;
    }

    else {
        emailRequired.style.display = "inline";
        return false;
    }
}

function validateQueryType(queryTypeButtons) {
    const isChecked = Array.from(queryTypeButtons).some((button) => button.checked);

    if (isChecked) {
        queryTypeRequired.style.display = "none";
        return true;
    } 
    
    else {
       queryTypeRequired.style.display = "inline";
       return false;
    }
}

function validateConsentCheckbox(consentCheckbox) {
    const isChecked = consentCheckbox.checked;

    if (isChecked) {
        consentCheckboxRequired.style.display = "none";
        return true;
    } 
    
    else {
        consentCheckboxRequired.style.display = "inline";
       return false;
    }
}

queryTypeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // hide all icons and make all radio buttons visible
        document.querySelectorAll(".query-type-option").forEach((option) => {
            const icon = option.querySelector(".radio-icon");
            const radio = option.querySelector(".query-type");

            // hide icons by default
            icon.style.display = "none";

            // show radio buttons
            radio.style.display = "inline-block";
        });

        // show selected icon and hide corresponding radio button
        const selectedIcon = button.previousElementSibling;

        // show selected icon
        selectedIcon.style.display = "inline-block";

        // hide radio button
        button.style.display = "none";
    });
});

function submitButton(event) {
    event.preventDefault();

    validateInput("first-name");
    validateInput("last-name");
    validateEmail(email);
    validateQueryType(queryTypeButtons);
    validateInput("message");
    validateConsentCheckbox(consentCheckbox);
    
    if (validateInput("first-name") && validateInput("last-name") && validateEmail(email) && validateQueryType(queryTypeButtons) && validateInput("message") && validateConsentCheckbox(consentCheckbox)) {
        successDiv.style.display = "inline-block"
        setTimeout(() => {
            form.submit()
        }, 3000);
    }
    
    else {
        successDiv.style.display = "none";
    }
}

submitBtn.addEventListener("click", () => {
    submitButton(event);
});