function sortMediaList(mediaList) {
	// Fonctions de tri
	function sortByDate(a, b) {
		if (a.date < b.date) {
			return -1
		}
		if (a.date > b.date) {
			return 1
		}
		return 0
	}
	function sortByTitre(a, b) {
		if (a.title < b.title) {
			return -1
		}
		if (a.title > b.title) {
			return 1
		}
		return 0
	}
	function sortByPopularity(a, b) {
		if (a.likes < b.likes) {
			return -1
		}
		if (a.likes > b.likes) {
			return 1
		}
		return 0
	}

	// cette fonction point sur le select , pose une variable qui point sur la valeur de cette select puis pose
	// un eventlistner et un switch case sur les choix de l'utilisateur , on applique la fonction  du tri
	//  puis on affiche dans le DOM les elements triés .

	const allFilters = Array.from(
		document.querySelectorAll(".dropdown_content li button")
	)
	const currentFilter = document.querySelector("#current_filter")

	allFilters.forEach((filter) => {

		filter.addEventListener("click", () => {
			const sortType = currentFilter.textContent
			switch (sortType) {
			case "Date":
				mediaList.sort(sortByDate)
				break
			case "Titre":
				mediaList.sort(sortByTitre)
				break
			case "Popularité":
				mediaList.sort(sortByPopularity)
				break
			}
			displayPhotographerMediasDOM(mediaList)
		})
	})
}


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
