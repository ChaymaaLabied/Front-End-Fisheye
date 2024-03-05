function displayLightbox() {
	const lightboxElement = document.getElementById("lightbox")
	lightboxElement.style.display = "block"
	lightboxElement.style.position = "fixed"
	// const videoElement = document.querySelector("#video-lightbox");
	// videoElement.setAttribute("controls", true);
	const main = document.getElementById("main")
	const header = document.querySelector("header")
	main.style.opacity = "0"
	header.style.opacity = "0"
}

function closeLightbox() {
	const lightboxElement = document.getElementById("lightbox")
	lightboxElement.style.display = "none"
	const videoLightBoxElt = document.getElementById("video-lightbox")
	videoLightBoxElt.style.display = "none"
	const mediaLightBoxElt = document.querySelector(".mediaLightBox") // modifier le nom imgLightBoxElt
	// mediaLightBoxElt.setAttribute('src','') // laquel utiliser j'en suis pas sure car les deux font le meme taf
	mediaLightBoxElt.style.display = "none"
	const main = document.getElementById("main")
	const header = document.querySelector("header")
	main.style.opacity = "1"
	header.style.opacity = "1"
}

// Mettre le code JavaScript lié à la page photographer.html

const params = new URL(document.location).searchParams

// Enregistre l'id de l'image selectionnée dans la lightbox

// cette fct est tres importante , c'est la ou on fait appel à toutes les autres fct dans template.js
async function photographerDetailsPage() { // le nom a changer
	const photographerId = params.get("id")
	const list = await getPhotographers()
	// console.log(list.photographers)
	const photographer = list.photographers.find((elt) => elt.id === parseInt(photographerId))
	// console.log(photographer)

	const mediaphoto = list.media.filter((elt) => elt.photographerId === parseInt(photographerId))
	const template = photographerTemplate(photographer)
	template.displayPhotographerDetailsDOM()
	const totalLikes = displayPhotographerMediasDOM(mediaphoto)
	setLightBoxListeners(mediaphoto, photographerId)

	sortMediaList(mediaphoto)

	const affichargeEncart = getEncartPhotographer(totalLikes, photographer.price)
	const MainContainer = document.getElementById("main")
	MainContainer.appendChild(affichargeEncart)
}

photographerDetailsPage()
