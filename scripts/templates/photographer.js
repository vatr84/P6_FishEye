function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
        link.href = `../../photographer.html?id=${id}`;

        const imgContainer = document.createElement( 'div' );
        imgContainer.classList.add( 'photographer_card' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = `${city}, ${country}`;
        const tag = document.createElement( 'p' );
        tag.textContent = tagline;
        const prix = document.createElement( 'p' );
        prix.textContent = `${price}€/jour`;

        article.appendChild(link);
        imgContainer.appendChild(img);
        link.appendChild(imgContainer);
        link.appendChild(h2);
        link.appendChild(h3);
        link.appendChild(tag);
        link.appendChild(prix);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}