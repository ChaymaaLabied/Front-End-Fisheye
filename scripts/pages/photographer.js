
function displayLightbox() {
    const lightboxElement = document.getElementById('lightbox')
    lightboxElement.style.display = 'block'
}

function closeLightbox() {
    const lightboxElement = document.getElementById('lightbox')
    lightboxElement.style.display = 'none'
}

//Mettre le code JavaScript lié à la page photographer.html

const params = new URL(document.location).searchParams

// Enregistre l'id de l'image selectionnée dans la lightbox

// cette fct est tres importante , c'est la ou on fait appel à toutes les autres fct dans template.js
async function photographerDetailsPage() { // le nom a changer 

    const photographerId = params.get('id')
    const list = await getPhotographers()
    // console.log(list.photographers)
    const photographer = list.photographers.find((elt) => elt.id === parseInt(photographerId))
    // console.log(photographer)

    const mediaphoto = list.media.filter((elt) => elt.photographerId === parseInt(photographerId))
    const template = photographerTemplate(photographer)
    template.displayPhotographerDetailsDOM()
    const totalLikes = displayPhotographerMediasDOM(mediaphoto)
    setLightBoxListeners(mediaphoto,photographerId)

    sortMediaList(mediaphoto)

    const affichargeEncart = getEncartPhotographer(totalLikes, photographer.price)
    const MainContainer = document.getElementById("main")
    MainContainer.appendChild(affichargeEncart)
    
}

photographerDetailsPage()


document.addEventListener('DOMContentLoaded', function() {
    var select = document.getElementById('photographer-filter');
    select.addEventListener('click', function() {
      this.size = this.size === 1 ? this.options.length : 1;
    });
  });


