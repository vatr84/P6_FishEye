import { sortPhotos } from "../pages/photographer.js";

// Sélection des éléments DOM nécessaires pour le menu déroulant
const dropdown = document.querySelector('.dropdown');
const selected = dropdown.querySelector('.selected');
const options = dropdown.querySelector('.dropdown-menu');
const dropdownIcon = dropdown.querySelector('.dropdown-icon');
const sortOptions = Array.from(options.querySelectorAll('.dropdown-option'));

// Initialiser l'option sélectionnée par défaut comme "Popularité"
let selectedOption = 'filter-popularite';

// Fonction pour basculer l'affichage du menu déroulant
function toggleDropdown() {
  if (options.style.display === 'block') {
    options.style.display = 'none';
  } else {
    options.style.display = 'block';
  }
  selected.setAttribute('aria-expanded', options.style.display === 'block' ? 'true' : 'false');
  dropdownIcon.style.transform = options.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0)';
}

// Fonction pour gérer la sélection d'une option
function selectOption(optionId) {
  // Obtenir l'option précédemment sélectionnée
  const previousOptionId = selectedOption;
  // Obtenir l'option précédemment sélectionnée div
  if (previousOptionId !== optionId) {
    const previousOptionElement = document.getElementById(previousOptionId);
    selected.removeChild(previousOptionElement);

    // Réorganiser les éléments pour refléter la nouvelle sélection
    options.appendChild(previousOptionElement);
    sortOptions.filter(option => option.id !== previousOptionId).sort((a, b) => a.getAttribute('data-order') - b.getAttribute('data-order')).forEach((option, index) => {
      option.style.order = index + 1;
      
    });
  }

  // Définir la nouvelle option sélectionnée
  selectedOption = optionId;
  const selectedOptionElement = document.getElementById(optionId);
  selected.appendChild(selectedOptionElement);
  selected.setAttribute('aria-label', `Selected option: ${selected.textContent}`);
  options.style.display = 'none';
  dropdownIcon.style.transform = 'rotate(0)';

  // Appeler la fonction de tri des photos avec l'option sélectionnée
  sortPhotos(optionId);
}

// Ajouter des écouteurs d'événements pour ouvrir/fermer le menu déroulant
selected.addEventListener('click', () => toggleDropdown());
selected.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    toggleDropdown();
  }
});

// Ajouter des écouteurs d'événements aux options du menu déroulant pour gérer la sélection
sortOptions.forEach((option) => {
  option.addEventListener('click', (e) => {
    selectOption(e.target.id);
  });

  option.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === 'Space') {
      selectOption(e.target.id);
    }
  });
});

// Définir l'option initiale sélectionnée
selectOption(selectedOption);
