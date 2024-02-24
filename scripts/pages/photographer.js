// cette fonction faut pas qu'elle soit copier ici , fallait une solution optimale 
async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    const response = await fetch("../data/photographers.json")
    const jsonData = await response.json()
    const photographersArray = jsonData.photographers
    const mediaArray = jsonData.media
    // et bien retourner le tableau photographers seulement une fois récupéré
    return ({
        photographers: photographersArray, media: mediaArray
    })
}
function displayLightbox() {
    const lightboxElement = document.getElementById('lightbox');
    lightboxElement.style.display = 'block';
}

function closeLightbox() {
    const lightboxElement = document.getElementById('lightbox');
    lightboxElement.style.display = 'none';
    const lightBoxMedia = document.querySelector('.mediaLightBox');
    lightBoxMedia.setAttribute('src', '')
}

//Mettre le code JavaScript lié à la page photographer.html

const params = new URL(document.location).searchParams;

// // Enregistre l'id de l'image selectionnée dans la lightbox
// let selectedMediaId;

async function getPhotographerrrr() {


    const photographerId = params.get('id');
    const list = await getPhotographers();
    // console.log(list.photographers)
    const photographer = list.photographers.find((elt) => elt.id === parseInt(photographerId));
    // console.log(photographer)


    const mediaphoto = list.media.filter((elt) => elt.photographerId === parseInt(photographerId))
    const template = photographerTemplate(photographer, mediaphoto);
    template.displayPhotographerDetailsDOM()
    const totalLikes = template.displayPhotographerMediasDOM()
    template.setLightBoxListeners()

    // Calculer le nombre total des likes
    // let totalLikes = 0
    // mediaphoto.forEach((elt) => {
    //     const mediaModel = mediaTemplate(elt)
    //     const userMediaDom = mediaModel.getmedia()
    //     // console.log(mediaModel.getmedia())
    //     photographeHeader.appendChild(userMediaDom)
    //     totalLikes += elt.likes
    //     console.log(totalLikes)
    // })

    // photographeHeader.appendChild(mediarecap)

    const affichargeEncart = getEncartPhotographer(totalLikes, photographer.price)
    const photographeHeader = document.querySelector(".photograph-header")
    photographeHeader.appendChild(affichargeEncart)

    // const imageElt = document.querySelectorAll('.media')
    // imageElt.forEach((elt) => {
    //     elt.addEventListener('click', (event) => {
    //         displayLightbox()
    //         const divModal = document.getElementById('mediaDefilement')
    //         const imageLightBox = document.querySelector('.defilement > img')
    //         imageLightBox.setAttribute('src', event.target.src)
    //         divModal.appendChild(imageLightBox)
    //         selectedMediaId = event.target.dataset.id;
    //     })
    // })

    // const prevButton = document.getElementById('prev')
    // const nextButton = document.getElementById('next');

    // prevButton.addEventListener('click', (event) => {
    //     console.log(selectedMediaId)
    //     const currentMediaIndex = mediaphoto.findIndex(elt => elt.id === parseInt(selectedMediaId));
    //     console.log('currentMediaIndex', currentMediaIndex)
    //     const prevMedia = currentMediaIndex > 0 ? mediaphoto[currentMediaIndex - 1] : mediaphoto[mediaphoto.length - 1]
    //     const mediaLightBoxElt = document.querySelector('.mediaLightBox');
    //     console.log('prevMedia', prevMedia)
    //     console.log(`assets/media/${photographerId}/${prevMedia.image}`)
    //     mediaLightBoxElt.setAttribute('src', `assets/media/${photographerId}/${prevMedia.image}`)
    //     selectedMediaId = prevMedia.id;
    // })


    // nextButton.addEventListener('click', (event) => {
    //     console.log(selectedMediaId)
    //     const currentMediaIndex = mediaphoto.findIndex(elt => elt.id === parseInt(selectedMediaId));
    //     console.log('currentMediaIndex', currentMediaIndex)
    //     const prevMedia = currentMediaIndex === mediaphoto.length - 1 ? mediaphoto[0] : mediaphoto[currentMediaIndex + 1]
    //     const imageLightBox = document.querySelector('.mediaLightBox');
    //     console.log('prevMedia', prevMedia)
    //     console.log(`assets/media/${photographerId}/${prevMedia.image}`)
    //     imageLightBox.setAttribute('src', `assets/media/${photographerId}/${prevMedia.image}`)
    //     selectedMediaId = prevMedia.id;
    // })
}

getPhotographerrrr()




