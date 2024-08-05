// Récupère le tableau depuis le fichier JSON
async function getPhotographers() {     
    const reponse = await fetch("data/photographers.json");
    const tableau = await reponse.json();
    return tableau;
}

// Fonction pour créer un texte
function createText(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
}

// Fonction pour créer une image
function createImage(src, alt) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    return img;
}

// Fonction pour créer un lien avec un label ARIA
function createLink(href, ariaLabel) {
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('aria-label', ariaLabel);
    return link;
}

function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    const link = createLink(`photographer.html?id=${id}`, `View profile of photographer ${name}`);

    const imgContainer = document.createElement( 'div' );
    imgContainer.classList.add( 'photographer_card' );

    const img = createImage(picture, `Portrait of ${name}, photographer from ${city}, ${country}`);
    const h2 = createText('h2', name);
    const h3 = createText('h3', `${city}, ${country}`);
    const tag = createText('p', tagline);
    const prix = createText('p', `${price}€/jour`);

    function getUserCardDOM(page) {
        const article = document.createElement( 'article' );
        imgContainer.appendChild(img);

        if (page==="index") {
            article.appendChild(link);
            link.append(imgContainer, h2, h3, tag, prix);
            return (article);
        } else {
            const photographerHeader = document.querySelector(".photograph-header");
            photographerHeader.append(h2, h3, tag, imgContainer);

            prix.classList.add('price');
            const priceLikesContainer = document.querySelector('.price-likes');
            priceLikesContainer.appendChild(prix);

            return (photographerHeader);
        }
    }
    return { name, picture, getUserCardDOM }
}