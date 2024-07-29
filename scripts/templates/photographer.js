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

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const link = document.createElement( 'a' );
        link.href = `../../photographer.html?id=${id}`;
        link.setAttribute('aria-label', `View profile of photographer ${name}`);
        /*const link = createLink(`../../photographer.html?id=${id}`, `View profile of photographer ${name}`);*/


        const imgContainer = document.createElement( 'div' );
        imgContainer.classList.add( 'photographer_card' );

       /*const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", `Portrait of ${name}, photographer from ${city}, ${country}`);*/
        const img = createImage(picture, `Portrait of ${name}, photographer from ${city}, ${country}`);

        /* const h2 = document.createElement( 'h2' );
        h2.textContent = name;*/
        const h2 = createText('h2', name);

       /*const h3 = document.createElement( 'h3' );
        h3.textContent = `${city}, ${country}`;*/
        const h3 = createText('h3', `${city}, ${country}`);

        /*const tag = document.createElement( 'p' );
        tag.textContent = tagline;*/
        const tag = createText('p', tagline);

        /*const prix = document.createElement( 'p' );
        prix.textContent = `${price}€/jour`;*/
        const prix = createText('p', `${price}€/jour`);

        article.appendChild(link);

        imgContainer.appendChild(img);

        link.append(imgContainer, h2, h3, tag, prix);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}