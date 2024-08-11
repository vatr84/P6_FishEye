// lightbox.js
import { createMedia } from './media.js';
import { photographerMedia as photographerPhotos } from '../pages/photographer.js';
import { trapFocus, openModalBtn } from './contactForm.js';

// Variables globales du DOM
const imageLightbox = document.getElementById('image-lightbox');
const overlay = document.querySelector('.overlay');
const closeLightboxButton = document.querySelector('.lightbox-close');
const prevButton = document.querySelector('.lightbox-prev');
const nextButton = document.querySelector('.lightbox-next');
const lightboxContent = document.querySelector('.lightbox-content');

let currentImageIndex = 0;

// Fonction pour ouvrir la lightbox avec les données du média
export function openLightbox(mediaData) {
  document.body.style.overflow = 'hidden';
  imageLightbox.style.display = 'block';
  overlay.style.display = 'block';
  currentImageIndex = photographerPhotos.findIndex(item => item.id === mediaData.id);
  loadCurrentImage();
  document.addEventListener('keydown', handleKeyDown);
  nextButton.focus();
  trapFocus(imageLightbox);
}

function closeImageLightbox() {
  document.body.style.overflow = 'auto';
  imageLightbox.style.display = 'none';
  overlay.style.display = 'none';
  openModalBtn.focus();
}

function loadCurrentImage() {
  lightboxContent.innerHTML = '';

  const media = createMedia(photographerPhotos[currentImageIndex]);
  const mediaElement = media.createMediaElement();
  mediaElement.classList.add('lightbox-media');
  lightboxContent.appendChild(mediaElement);
  const mediaTitle = document.createElement('div');
  mediaTitle.classList.add('media-title');
  mediaTitle.textContent = media.title;
  lightboxContent.appendChild(mediaTitle);
}



// Gestion du clic sur le bouton précédent
prevButton.addEventListener('click', () => {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    loadCurrentImage();
  }
});

// Gestion du clic sur le bouton suivant
nextButton.addEventListener('click', () => {
  if (currentImageIndex < photographerPhotos.length - 1) {
    currentImageIndex++;
    loadCurrentImage();
  }
});

// Gestion du clic sur le bouton de fermeture
closeLightboxButton.addEventListener('click', closeImageLightbox);
overlay.addEventListener('click', closeImageLightbox);

// Ajouter des écouteurs d'événements pour ouvrir la lightbox
const mediaGridItems = document.querySelectorAll('.photo');
mediaGridItems.forEach((mediaItem, index) => {
  mediaItem.addEventListener('click', () => {
    currentImageIndex = index;
    openLightbox(photographerPhotos[index], photographerPhotos); // Ouvrir la lightbox avec les données de l'image actuelle
  });
});

// Fonction pour gérer les touches du clavier
function handleKeyDown(event) {
  switch (event.key) {
    case 'ArrowLeft':
      // Gérer la touche flèche gauche (image précédente)
      if (currentImageIndex > 0) {
        currentImageIndex--;
        loadCurrentImage();
      }
      break;
    case 'ArrowRight':
      // Gérer la touche flèche droite (image suivante)
      if (currentImageIndex < photographerPhotos.length - 1) {
        currentImageIndex++;
        loadCurrentImage();
      }
      break;
    case 'Escape':
      // Gérer la touche Échap (fermer la lightbox)
      closeImageLightbox();
      break;
  }
}
