// Enregistre l'id de l'image selectionnée dans la lightbox
let selectedMediaId

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
		img.setAttribute("alt","le photgrpaher :"+name)
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
	// récuperer les élements de la section photographers-details pour les affichées dans photographer .html
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

// cette fontion a pour donneé mediaData donc elle contient toute autre fct qui utilise ces données 
// elle recupere et affiche toutes les données de chaque media d'un x photographe 
function mediaTemplate(mediaData) {
	const { photographerId, title, id } = mediaData
	let { likes } = mediaData
	// afficher toutes les media  photographer.html
	// avec l'appel a la fct du lancement du lightBox lors du Click
	// juste l'ouverture du lightbox et ce qui va avec cette ouverture
	function getmedia() {
		const article = document.createElement("article")
		if (mediaData.image) {
			const pics = `assets/media/${photographerId}/${mediaData.image}` 
			const img = document.createElement("img")
			img.setAttribute("src", pics)
			img.setAttribute("alt", mediaData.title)
			img.classList.add("media")
			img.addEventListener("click", (event) => {
				displayLightbox()
				const photoLightBoxElt = document.querySelector(".photo-LightBox") 
				photoLightBoxElt.style.display = "block"
				photoLightBoxElt.setAttribute("src", event.target.src)
				photoLightBoxElt.setAttribute("alt", mediaData.title)
				const mediaTitle = document.querySelector(".mediaTitle")
				mediaTitle.textContent = mediaData.title
				selectedMediaId = id
			})
		
			article.appendChild(img)
		} else {
			const vidd = `assets/media/${photographerId}/${mediaData.video}`
			const video = document.createElement("video")
			video.setAttribute("src", vidd)
			video.setAttribute("type", "video/mp4")
			video.classList.add("media")
			video.setAttribute("controls", true)
			video.addEventListener("click", (event) => {
				displayLightbox()
				const videoElement = document.querySelector("#video-lightbox")
				videoElement.setAttribute("controls", true)
				videoElement.setAttribute("src", event.target.src)
				videoElement.style.display = "block"
				selectedMediaId = id
			})
			article.appendChild(video)
		}

		// creation des elements dans le DOM : titre et nb de like et icone sous chaque media d'un x photgraphe
		const mediaPhotographerDiv = document.createElement("div")
		mediaPhotographerDiv.setAttribute("class", "titleAndLikesOfMedia")
		const h2 = document.createElement("h2")
		const likesElt = document.createElement("div")
		likesElt.setAttribute("class", "likesAndIconeDiv")
		const iconLikes = document.createElement("em")
		const nbLikeElt = document.createElement("span")
		h2.textContent = title
		nbLikeElt.textContent = likes
		iconLikes.setAttribute("class", "fa-solid fa-heart")
		iconLikes.setAttribute("aria-label","cliquer pour aimer")
		iconLikes.setAttribute("aria-role","icon")
		mediaPhotographerDiv.appendChild(h2)
		likesElt.appendChild(nbLikeElt)
		likesElt.appendChild(iconLikes)
		mediaPhotographerDiv.appendChild(likesElt)
		article.appendChild(mediaPhotographerDiv)

		// l'incrementation des likes juste une seule fois qu'on clique
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

// la creation de l'encart 
function getEncartPhotographer(totalLikes, price) {

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


