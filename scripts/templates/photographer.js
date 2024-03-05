// Enregistre l'id de l'image selectionnée dans la lightbox
let selectedMediaId
// a quoi sert la grande fonction
function photographerTemplate(photographerData) {
	const { name, portrait, city, country, tagline, price, id } =
    photographerData

	const picture = `assets/photographers/${portrait}`
	// créer la carte des photographers dans la page principale index.html et
	// retourne la carte de chaque photographer (lien  cliquable)
	function getUserCardDOM() {
		const aElement = document.createElement("a")
		aElement.setAttribute("href", `./photographer.html?id=${id}`)
		const article = document.createElement("article")
		const img = document.createElement("img")
		img.setAttribute("src", picture)
		const h2 = document.createElement("h2")
		h2.textContent = name
		h2.setAttribute("class", "photographerName")
		article.appendChild(img)
		article.appendChild(h2)
		const cityAndCountry = document.createElement("p")
		cityAndCountry.textContent = `${city} , ${country}`
		cityAndCountry.setAttribute("class", "cityAndCountry")
		article.appendChild(cityAndCountry)
		const taglineElement = document.createElement("p")
		taglineElement.textContent = tagline
		taglineElement.setAttribute("class", "tagline")
		article.appendChild(taglineElement)
		const priceElement = document.createElement("p")
		priceElement.textContent = `${price}€/jour`
		priceElement.setAttribute("class", "price")
		article.appendChild(priceElement)
		aElement.appendChild(article)
		return aElement
	}
	// afficher les elements du photographers dans photographer.html
	function displayPhotographerDetailsDOM() {
		// récuperer les élements du photographers-details affichées dans photographer .html
		const img = document.querySelector(".photographerPhotoId")
		img.setAttribute("src", picture)
		img.alt = `Photo du profil de ${name}`
		const h2 = document.querySelector(".photographerName")
		h2.textContent = name
		const cityAndCountry = document.querySelector(".location")
		cityAndCountry.textContent = `${city} , ${country}`
		const taglineElement = document.querySelector(".tagLine")
		taglineElement.textContent = tagline
		const titleContact = document.querySelector(".modal_name")
		titleContact.textContent = name
	}

	return {
		name,
		picture,
		getUserCardDOM,
		displayPhotographerDetailsDOM,
	}
}

function mediaTemplate(mediaData) {
	// cette fct prend comme para les elements du mediaList se sont des data
	// pas des elements dom that's why on les nomme Data
	const { photographerId, title, id } = mediaData
	let { likes } = mediaData
	// afficher toutes les media soit photo soit video dans le dossier de chaque photographer
	// avec l'appel a la fct du lancement du lightBox lors du Click
	function getmedia() {
		const article = document.createElement("article")
		if (mediaData.image) {
			const pics = `assets/media/${photographerId}/${mediaData.image}` // je px ajt image f let et puis faire juste image
			const img = document.createElement("img")
			img.setAttribute("src", pics)
			img.classList.add("media")
			img.addEventListener("click", (event) => {
				displayLightbox()
				const imageLightBox = document.querySelector(".mediaLightBox")
				imageLightBox.style.display = "block"
				imageLightBox.setAttribute("src", event.target.src)
				imageLightBox.setAttribute("alt", mediaData.title)
				// console.log(event.target.src)
				const mediaTitle = document.querySelector(".mediaTitle")
				mediaTitle.textContent = mediaData.title
				// console.log(mediaTitle)
				selectedMediaId = id
			})
			article.appendChild(img)
		} else {
			const vidd = `assets/media/${photographerId}/${mediaData.video}`
			const video = document.createElement("video")
			// const source = document.createElement("source");
			// source.setAttribute("src", vidd);
			video.setAttribute("src", vidd)
			// source.setAttribute("type", "video/mp4");
			video.setAttribute("type", "video/mp4")
			// source.classList.add("media");
			video.classList.add("media")
			video.setAttribute("controls", true)
			// video.appendChild(source);
			video.addEventListener("click", (event) => {
				displayLightbox()
				// pourquoi creer des variables jdad qui vont pointer sur les juste un peu en haut
				const videoElement = document.querySelector("#video-lightbox")
				// const sourceElement = document.querySelector("#video-lightbox source");
				videoElement.setAttribute("controls", true)
				videoElement.setAttribute("src", event.target.src)
				// sourceElement.setAttribute("src", event.target.vidd);
				// console.log(video)
				// console.log(vidd)
				// console.log(sourceElement)
				// console.log(event.target.src) kan ldakha f src et c un object in fact
				videoElement.style.display = "block"
				selectedMediaId = id
			})
			article.appendChild(video)
		}
		// creation des elements dans le DOM : titre et nb de like et icone sous chaque photo dans le dossier d'un photographer
		const mediaPhotographerDiv = document.createElement("div")
		mediaPhotographerDiv.setAttribute("class", "titleAndLikesOfMedia")
		const h2 = document.createElement("h2")
		const likesElt = document.createElement("div")
		likesElt.setAttribute("class", "likesAndIconeDiv")
		const iconLikes = document.createElement("i")
		const nbLikeElt = document.createElement("span")
		h2.textContent = title
		nbLikeElt.textContent = likes
		iconLikes.setAttribute("class", "fa-solid fa-heart")
		mediaPhotographerDiv.appendChild(h2)
		likesElt.appendChild(nbLikeElt)
		likesElt.appendChild(iconLikes)
		mediaPhotographerDiv.appendChild(likesElt)
		article.appendChild(mediaPhotographerDiv)
		// cette fct utilise les données en haut donc c bn il peur rester ici
		function likesIncrementation() {
			likes++
			nbLikeElt.textContent = likes
			const totalLikesElement = document.querySelector(".totalLikes")
			totalLikesElement.textContent =
        parseInt(totalLikesElement.textContent) + 1
			iconLikes.removeEventListener("click", likesIncrementation)
		}
		iconLikes.addEventListener("click", likesIncrementation)

		return article
	}
	return { getmedia }
}

// cette fonction calcul le nombre de like total et puis l'affiche dans le DOM et returne le nombre total des likes
// a revoir
function displayPhotographerMediasDOM(mediaList) {
	let totalLikes = 0
	const photographeMediaList = document.querySelector(".media-list")
	photographeMediaList.textContent = ""
	mediaList.forEach((elt) => {
		const mediaModel = mediaTemplate(elt)
		const userMediaDom = mediaModel.getmedia()
		photographeMediaList.appendChild(userMediaDom)
		totalLikes += elt.likes
	})
	return totalLikes
}

function getEncartPhotographer(totalLikes, price) {
	//   const encart = document.createElement("div")
	//   const totalLikesElement = document.createElement("span")
	//   const nbLikes = document.createElement("span")
	//   nbLikes.setAttribute("id", "totalLikes")
	//   const iconLikes = document.createElement("i")
	//   nbLikes.textContent = totalLikes
	//   const priceElement = document.createElement("span")
	//   priceElement.textContent = ` ${price}€/jour `
	//   iconLikes.setAttribute("class", "fa-solid fa-heart")

	const encart = document.querySelector(".encart")
	const totalLikesElement = document.querySelector(".totalLikesElement")
	const nbLikes = document.querySelector(".totalLikes")
	nbLikes.textContent = totalLikes
	const iconLikes = document.querySelector(".icon")
	const priceElement = document.querySelector(".PricePerDay")
	priceElement.textContent = ` ${price}€/jour `
	totalLikesElement.appendChild(nbLikes)
	totalLikesElement.appendChild(iconLikes)
	encart.appendChild(totalLikesElement)
	encart.appendChild(priceElement)

	return encart
}

// Ajout d'un listner click sur le filtre pour le tri

const filterMenuButton = document.querySelector(".btn_list")
const filterMenu = document.querySelector(".dropdown_content")
filterMenuButton.addEventListener("click", dropdown) // need to be in a function or f fichier bèadha
// la declaration de la fonction dropdown qui
function dropdown() {
	// const filterButtons = document.querySelectorAll(".dropdown_content button");// didnt use it
	const isExpanded =
    filterMenuButton.getAttribute("aria-expanded") === "true" || false
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
// by fatifa aussi
document.addEventListener("DOMContentLoaded", () => {
	const currentFilter = document.querySelector("#current_filter")
	const allFilters = Array.from(
		document.querySelectorAll(".dropdown_content li button")
	)
	// all ready or already et demander == veut dire koi
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
// c ma fct non modifié jsuk'a present
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
	// un eventlistner et un switch case sur les choix de l'utilisateur , on applique la fonction associé du tri
	// a chaque cas et puis on affiche dans le DOM les elements triés .

	const allFilters = Array.from(
		document.querySelectorAll(".dropdown_content li button")
	)
	const currentFilter = document.querySelector("#current_filter")
	// console.log(allFilters)
	allFilters.forEach((filter) => {
		// console.log(filter)
		// console.log(filter.textContent)
		filter.addEventListener("click", () => {
			const sortType = currentFilter.textContent
			console.log(sortType)
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

function setLightBoxListeners(mediaList, id) {
	// defilement entre les medias soit photo ou video , je cois qu'on peut la mettre dans une fonction séparée avec
	// displayPhotographerMediaDom
	const prevButton = document.getElementById("prev")
	const nextButton = document.getElementById("next")
	function defiler(direction) {
		// déclaration de la fonction defiler
		const currentMediaIndex = mediaList.findIndex(
			(elt) => elt.id === parseInt(selectedMediaId)
		)
		let media
		if (direction === "previous") {
			// media reçois l'element precedent si l'index actuel est sup à 0 sinon c-a-d si c'est 0
			// elle va recevoir le dernier élement du tableau pour faire une boucle qui tourne voila
			media =
        currentMediaIndex > 0? mediaList[currentMediaIndex - 1] : mediaList[mediaList.length - 1]
		} else if (direction === "next") {
			// la meme chose ici mais à l'envers
			// media reçois le premier element si on est sur la derniere photo
			media =
        currentMediaIndex === mediaList.length - 1 ? mediaList[0]: mediaList[currentMediaIndex + 1]
		}
		const mediaLightBoxElt = document.querySelector(".mediaLightBox") // modifier le nom imgLightBoxElt
		const videoElement = document.querySelector("#video-lightbox") // vidLightBoxElt
		// const sourceElement = document.querySelector("#video-lightbox source"); //srcVideoElt
		const mediaTitle = document.querySelector(".mediaTitle")
		mediaTitle.textContent = media.title
		// console.log(mediaTitle)
		// console.log(media);
		if (media.image) {
			videoElement.style.display = "none"
			mediaLightBoxElt.style.display = "block"
			mediaLightBoxElt.setAttribute("src", `assets/media/${id}/${media.image}`)
			mediaLightBoxElt.setAttribute("alt", media.title)
		} else if (media.video) {
			mediaLightBoxElt.style.display = "none"
			videoElement.style.display = "block"
			videoElement.setAttribute("src", `assets/media/${id}/${media.video}`)
		}
		selectedMediaId = media.id
	}
	document.addEventListener("keyup", (e) => {
		switch (e.key) {
		case "Escape":
			closeLightbox()
			break
		case "ArrowLeft":
			defiler("previous")
			break
		case "ArrowRight":
			defiler("next")
			break
		}
	})

	prevButton.addEventListener("click", () => {
		defiler("previous") // l'appel de la fonction défiler
	})

	nextButton.addEventListener("click", () => {
		defiler("next")
	})
}

// pour la gestionn du nom du photographe apres contactez moi dans la modal
// const titleContact = document.querySelector(".modal_name");
// titleContact.textContent = photographerModel.name;
// photographHeader.appendChild(photographerDom);
