//Le code JavaScript lié à la page index.html

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM("index");
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {     
    const { photographers } = await getPhotographers(); // Récupère les données des photographes
    displayData(photographers);
}

init();