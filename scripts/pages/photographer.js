// la declaration de la fonction de l'affichage du lightbox
function displayLightbox() {
	const lightboxElement = document.getElementById("lightbox")
	lightboxElement.style.display = "block"
	lightboxElement.style.position = "fixed"
	const main = document.getElementById("main")
	const header = document.querySelector("header")
	main.style.opacity = "0"
	header.style.opacity = "0"
}
// la declaration de la fonction de la fermeture du lightbox
function closeLightbox() {
	const lightboxElement = document.getElementById("lightbox")
	lightboxElement.style.display = "none"
	const videoLightBoxElt = document.getElementById("video-lightbox")
	videoLightBoxElt.style.display = "none"
	const mediaLightBoxElt = document.querySelector(".mediaLightBox") 
	mediaLightBoxElt.style.display = "none"
	const main = document.getElementById("main")
	const header = document.querySelector("header")
	main.style.opacity = "1"
	header.style.opacity = "1"
}

// Mettre le code JavaScript lié à la page photographer.html

const params = new URL(document.location).searchParams

// Enregistre l'id de l'image selectionnée dans la lightbox

// cette fct est tres importante , c'est la ou on fait appel à toutes les autres fct du template.js
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
// Ajout d'un listner click sur le filtre pour le tri
function dropdownLaunch(){
	const filterMenuButton = document.querySelector(".btn_list")
	filterMenuButton.addEventListener("click", dropdown) 
}
// la declaration de la fonction dropdown 
function dropdown() {
	const filterMenuButton = document.querySelector(".btn_list")
	const filterMenu = document.querySelector(".dropdown_content")
	const isExpanded =filterMenuButton.getAttribute("aria-expanded") === "true" || false
	const btnListStyle = document.querySelector(".btn_list")

	if (isExpanded) {
		filterMenu.style.display = "none"
		filterMenuButton.focus()
		btnListStyle.style.borderRadius = "5px"
	} else {
		filterMenu.style.display = "contents"
		btnListStyle.style.borderRadius = "5px 5px 0 0"
	}

	filterMenuButton.setAttribute("aria-expanded", !isExpanded)
	document.querySelector(".fa-chevron-down").classList.toggle("rotate")
}

function filterDOMListner(){
	document.addEventListener("DOMContentLoaded", () => {
		const currentFilter = document.querySelector("#current_filter")
		const allFilters = Array.from(
			document.querySelectorAll(".dropdown_content li button")
		)
  
		let filterAlreadySelected = allFilters.find(
			(filter) => filter.textContent == currentFilter.textContent
		)
  
		filterAlreadySelected.parentElement.style.display = "none"
  
		allFilters.forEach((filter) => {
			filter.addEventListener("click", () => {
				currentFilter.textContent = filter.textContent
  
				// Hide the entire <li> block
				const parentLi = filter.parentElement
				parentLi.style.display = "none"
  
				// If a filter was previously selected, show its <li> block
				if (filterAlreadySelected) {
					const previousParentLi = filterAlreadySelected.parentElement
					previousParentLi.style.display = "block"
				}
  
				filterAlreadySelected = filter
  
				dropdown()
			})
		})
	})
}
dropdownLaunch()
filterDOMListner()