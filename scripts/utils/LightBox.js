// la declaration de la fonction de l'affichage du lightbox
function displayLightbox() {
	const lightboxElement = document.getElementById("lightbox")
	lightboxElement.style.display = "block"
	lightboxElement.style.position = "fixed"
	lightboxElement.classList.replace("closed", "opened")
	const main = document.getElementById("main")
	const header = document.querySelector("header")
	main.style.opacity = "0"
	header.style.opacity = "0"
	main.classList.replace("opened","closed")
	const iconLightBox = document.querySelectorAll(".fa")
	iconLightBox.forEach((icon)=>{
		icon.setAttribute("aria-hidden", "false")
	})
}

// la declaration de la fonction de la fermeture du lightbox
function closeLightbox() {
	const lightboxElement = document.getElementById("lightbox")
	lightboxElement.style.display = "none"
	lightboxElement.classList.replace("opened","closed")
	const videoLightBoxElt = document.getElementById("video-lightbox")
	videoLightBoxElt.style.display = "none"
	const photoLightBoxElt = document.querySelector(".photo-LightBox") 
	photoLightBoxElt.style.display = "none"
	const main = document.getElementById("main")
	const header = document.querySelector("header")
	main.style.opacity = "1"
	header.style.opacity = "1"
	main.classList.replace("closed", "opened")
	const iconLightBox = document.querySelectorAll(".fa")
	iconLightBox.forEach((icon)=>{
		icon.setAttribute("aria-hidden", "true")
	})
}

// le comportement à l'interieur du lightbox
function setLightBoxListeners(mediaList, id) {
	// defilement entre les medias soit photo ou video 
	const prevButton = document.getElementById("prev")
	const nextButton = document.getElementById("next")
	// déclaration de la fonction defiler
	function defiler(direction) {
		const currentMediaIndex = mediaList.findIndex(
			(elt) => elt.id === parseInt(selectedMediaId)
		)
		let media
		if (direction === "previous") {
			// media reçois l'element precedent si l'index actuel est sup à 0 sinon c-a-d si c'est 0
			// elle va recevoir le dernier élement du tableau pour faire une boucle 
			media =
        currentMediaIndex > 0? mediaList[currentMediaIndex - 1] : mediaList[mediaList.length - 1]
		} else if (direction === "next") {
			// la meme chose ici mais à l'envers
			// media reçois le premier element si on est sur la derniere media
			media =
        currentMediaIndex === mediaList.length - 1 ? mediaList[0]: mediaList[currentMediaIndex + 1]
		}
		const photoLightBoxElt = document.querySelector(".photo-LightBox") 
		const videoElement = document.querySelector("#video-lightbox") 
		const mediaTitle = document.querySelector(".mediaTitle")
		mediaTitle.textContent = media.title
		if (media.image) {
			videoElement.style.display = "none"
			photoLightBoxElt.style.display = "block"
			photoLightBoxElt.setAttribute("src", `assets/media/${id}/${media.image}`)
			photoLightBoxElt.setAttribute("alt", media.title)
		} else if (media.video) {
			photoLightBoxElt.style.display = "none"
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