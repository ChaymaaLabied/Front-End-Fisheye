

// Mettre le code JavaScript lié à la page photographer.html

const params = new URL(document.location).searchParams

// cette fct est tres importante , c'est la ou on fait appel à toutes les autres fct 
async function photographerDetailsPage() { 
	const photographerId = params.get("id")
	const list = await getPhotographers()
	const photographer = list.photographers.find((elt) => elt.id === parseInt(photographerId))
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

dropdownLaunch()
filterDOMListner()	