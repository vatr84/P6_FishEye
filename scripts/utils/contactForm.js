// Variables DOM Globales
const modal = document.getElementById('contact_modal');
const openModalBtn = document.querySelector('.contact_button');
const closeModalBtn = document.querySelector('.modal-close-btn');
const overlay = document.querySelector('.overlay');
const firstName = document.getElementById('first-name');

// Fonction pour garder le focus à l'intérieur de la modale
function trapFocus(element) {
  const focusableEls = element.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
  const firstFocusableEl = focusableEls[0];  
  const lastFocusableEl = focusableEls[focusableEls.length - 1];

  element.addEventListener('keydown', function(e) {
      const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

      if (!isTabPressed) {
          return;
      }

      if (e.shiftKey) { // Si l'utilisateur presse Shift + Tab
          if (document.activeElement === firstFocusableEl) {
              lastFocusableEl.focus();
              e.preventDefault();
          }
      } else { // Si l'utilisateur presse Tab seulement
          if (document.activeElement === lastFocusableEl) {
              firstFocusableEl.focus();
              e.preventDefault();
          }
      }
  });
}

// Fonction pour ouvrir la modale
function displayModal() {
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  openModalBtn.setAttribute('aria-expanded', 'true');
  firstName.focus();
  trapFocus(modal);
  document.body.style.overflow = 'hidden';
  document.body.classList.add('no-interaction');
  overlay.style.display = 'block';
}

// Fonction pour fermer la modale
function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  openModalBtn.setAttribute('aria-expanded', 'false');
  openModalBtn.focus();
  document.body.classList.remove('no-interaction');
  document.body.style.overflow = 'auto';
  overlay.style.display = 'none';
}

// Gestionnaires d'événements
openModalBtn.addEventListener('click', displayModal);
closeModalBtn.addEventListener('click', closeModal);

// Ferme la modale quand la touche Échap est pressée
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});

const form = document.getElementById('contact-form');

// Empêche la soumission du formulaire et lance la validation au clic sur le bouton de soumission
form.addEventListener('submit', (e) => {
  e.preventDefault(); 
   validate();
  });

function validateName(input) {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/;
  if (!regex.test(input.value)) {
    input.classList.add("field-error");
    return false;
  } else {
    input.classList.remove("field-error");
    return true;
  }
}

function validateEmail(input) {
  const emailRegex = /^[A-Za-z]{1,}[A-Za-z0-9._%+-]+@[A-Za-z.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(input.value)) {
    input.classList.add("field-error");
    return false;
  } else {
    input.classList.remove("field-error");
    return true;
  }
}

function validateMessage(input) {
  if (input.value === "") {
    input.classList.add("field-error");
    return false;
  } else {
    input.classList.remove("field-error");
    return true;
  }
}

const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

// Validation en temps réel des champs de saisie
firstNameInput.addEventListener("input", function() {
  validateName(firstNameInput);
});
lastNameInput.addEventListener("input", function() {
  validateName(lastNameInput);
});
emailInput.addEventListener("input", function() {
  validateEmail(emailInput);
});
messageInput.addEventListener("input", function() {
  validateMessage(messageInput);
});

// Fonction principale de validation du formulaire
  function validate() {
    const firstNameValid = validateName(firstNameInput);
    const lastNameValid = validateName(lastNameInput);
    const emailValid = validateEmail(emailInput);
    const messageValid = validateMessage(messageInput);

  
    const isValid =
      firstNameValid &&
      lastNameValid &&
      emailValid &&
      messageValid;

    if (isValid) {
   console.log(
        "First name: " + firstNameInput.value + "\n" +
        "Last name: " + lastNameInput.value + "\n" +
        "Email: " + emailInput.value + "\n" +
        "Message: " + messageInput.value
      );      
      closeModal();
      return true;
    } else {
      return false;
    }
  }

export { trapFocus, openModalBtn };