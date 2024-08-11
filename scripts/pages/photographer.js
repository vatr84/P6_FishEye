//Le code JavaScript lié à la page photographer.html
import { createMedia } from '../utils/media.js';
import { updateTotalLikes } from '../utils/likes.js';
import { openLightbox } from '../utils/lightbox.js'; 


// Récupère les paramètres de l'URL
const urlSearchParams = new URLSearchParams(window.location.search);
// Extrait l'identifiant du photographe des paramètres de l'URL
const photographerId = urlSearchParams.get('id');

const likedMedia = new Set();
export let photographerMedia = [];

// Fonction pour créer un élément vidéo
function createVideoElement(src, title) {
  const video = document.createElement('video');
  video.src = src;
  video.type = 'video/mp4';
  video.setAttribute('aria-label', `Video: ${title}`);
  return video;
}

// Fonction pour gérer les likes des médias
function likeMedia(mediaId, mediaCard, likesElement, heart) {
  // Vérifie si le média n'a pas encore été liké
  if (!likedMedia.has(mediaId)) {
    // Recherche le média correspondant
    const media = photographerMedia.find(media => media.id === mediaId);
    if (media) {
      media.likes += 1;
      likedMedia.add(mediaId);
      likesElement.textContent = `${media.likes}`;
      heart.classList.add('liked'); 
      updateTotalLikes();
    }
  }
}

// Fonction pour créer et rendre les médias
function createRenderMedia(photos) {
 
  // Vérifiez que photos est défini et est un tableau
  if (!Array.isArray(photos)) {
    console.error("Les données des photos ne sont pas valides ou sont undefined.");
    return;
  }

  const photoGrid = document.querySelector('.photo-grid');
  if (!photoGrid) {
    console.error("L'élément .photo-grid n'a pas été trouvé.");
    return;
  }

  photoGrid.innerHTML = '';

  photos.forEach(mediaData => {
    const media = createMedia(mediaData);
    const mediaCard = document.createElement('div');
    mediaCard.classList.add('photo');

    if (media.type === 'image') {
      // Image
      const image = document.createElement('img');
      image.src = media.url;
      image.alt = media.title;
      
      image.setAttribute('tabindex', '0');
      image.addEventListener('click', () => openLightbox(mediaData));
      image.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          openLightbox(mediaData);
        }
      });
      mediaCard.appendChild(image);
    } else if (media.type === 'video') {
      // Video
      const video = createVideoElement(media.url, media.title);
      mediaCard.appendChild(video);
    }

  const photoInfo = document.createElement('div');
  photoInfo.classList.add('photo-info');

  const title = document.createElement('h3');
  title.textContent = media.title;
  photoInfo.appendChild(title);

  const likesContainer = document.createElement('div');
  likesContainer.classList.add('likes-container');

  const likes = document.createElement('p');
  likes.textContent = media.likes;
  likes.classList.add('photo-likes');

  const heart = createHeartIcon();
  heart.addEventListener('click', () => likeMedia(media.id, mediaCard, likes, heart));

  likesContainer.appendChild(likes);
  likesContainer.appendChild(heart);
  photoInfo.appendChild(likesContainer);

  mediaCard.appendChild(photoInfo);
  photoGrid.appendChild(mediaCard);
  });
}

// Fonctions de tri
function sortByPopularity(photos) {
  return photos.sort((a, b) => b.likes - a.likes);
}

function sortByDate(photos) {
  return photos.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function sortByTitle(photos) {
  return photos.sort((a, b) => a.title.localeCompare(b.title));
}

// Fonction pour trier les photos
export async function sortPhotos(sortBy) {

  if (!Array.isArray(photographerMedia) || photographerMedia.length === 0) {
    console.error("photographerMedia n'est pas défini ou est vide.");
    return;
  }

  let sortedPhotos;

  switch (sortBy) {
    case 'popularite':
      sortedPhotos = sortByPopularity(photographerMedia);
      break;
    case 'date':
      sortedPhotos = sortByDate(photographerMedia);
      break;
    case 'titre':
      sortedPhotos = sortByTitle(photographerMedia);
      break;
    default:

      console.error("Critère de tri non reconnu : " + sortBy);
    
      break;
  }

  createRenderMedia(sortedPhotos);
}

// Fonction pour afficher les données d'un photographe
async function displayData(photographer) {
  if (!photographer) {
    console.error("Les données du photographe ne sont pas valides.");
    return;
  }
   
  const photographerModel = photographerTemplate(photographer);   // Crée un modèle de photographe en utilisant une fonction template
    
  photographerModel.getUserCardDOM();         // Génère le DOM de la carte utilisateur du photographe
  /*createRenderMedia(photographerMedia);*/
  sortPhotos('popularite');
}

// Fonction d'initialisation pour récupérer et afficher les données du photographe
async function init(id) {     
  if (!id) {
    console.error("Identifiant de photographe non fourni.");
    return;
  }

  const { photographers, media } = await getPhotographers();                                     // Récupère les données des photographes
  const data = photographers.find(photographer => photographer.id === parseInt(id, 10));  // Trouve le photographe correspondant à l'identifiant fourni
  photographerMedia = media.filter(photo => photo.photographerId === parseInt(id));
    
  displayData(data);                                                                      // Affiche les données du photographe trouvé
}

init(photographerId);

function createHeartIcon() {
  const heart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  heart.setAttribute('width', '21');
  heart.setAttribute('height', '24');
  heart.setAttribute('viewBox', '0 0 21 24');
  heart.setAttribute('fill', 'none');
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M10.5 21.35L9.23125 20.03C4.725 15.36 1.75 12.28 1.75 8.5C1.75 5.42 3.8675 3 6.5625 3C8.085 3 9.54625 3.81 10.5 5.09C11.4537 3.81 12.915 3 14.4375 3C17.1325 3 19.25 5.42 19.25 8.5C19.25 12.28 16.275 15.36 11.7688 20.04L10.5 21.35Z');
  path.setAttribute('fill', '#911C1C');
  
  heart.appendChild(path);
  
  return heart;
}


const priceLikesContainer = document.querySelector('.price-likes');
if (priceLikesContainer) {
  const heart = createHeartIcon();
  const path = heart.querySelector('path');
  path.setAttribute('fill', 'black');
  priceLikesContainer.appendChild(heart);
}
  
// Ajout des événements de tri
document.getElementById('filter-date').addEventListener('click', () => sortPhotos('date'));
document.getElementById('filter-date').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sortPhotos('date');
  }
});

document.getElementById('filter-titre').addEventListener('click', () => sortPhotos('titre'));
document.getElementById('filter-titre').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sortPhotos('titre');
  }
});

document.getElementById('filter-popularite').addEventListener('click', () => sortPhotos('popularite'));
document.getElementById('filter-popularite').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sortPhotos('popularite');
  }
});

// Initialisation des observateurs pour les changements dans la grille des photos
document.addEventListener('DOMContentLoaded', async () => {
  const targetNode = document.querySelector('.photo-grid');
  if (targetNode) {
    const observer = new MutationObserver(updateTotalLikes);
    const config = { childList: true, subtree: true };
    observer.observe(targetNode, config);

    updateTotalLikes();
  } else {
    console.error("L'élément .photo-grid n'a pas été trouvé.");
  }
});

