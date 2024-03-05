/* eslint-disable no-mixed-spaces-and-tabs */
function closeModal() {
	const modal = document.getElementById("contact_modal")
	modal.style.display = "none"
	modal.classList.replace("opened", "closed")
	modal.setAttribute("aria-hidden", "true")
	const main = document.getElementById("main")
	main.style.opacity = "1"
	main.setAttribute("aria-hidden", "false")
	main.classList.replace("closed", "opened")
	const header = document.querySelector("header")
	header.style.opacity = "1"
	document.body.style.overflow = ""
	const btnOpen = document.querySelector(".contact_button")
	btnOpen.focus()
	const focusableElements = document.querySelectorAll(
		".btn_list, .menu-item, article , [tabindex]:not([tabindex=\"-1\"]),.photograph-header button",
	)
	focusableElements.forEach((element) => {
		element.setAttribute("tabindex", "0")
	})

}

function displayModal() {
	// Désactivation du focus sur certains éléments :
	const focusableElements = document.querySelectorAll(
		".btn_list, .menu-item, article,[tabindex]:not([tabindex=\"-1\"]),.photograph-header button",
	)
	focusableElements.forEach((element) => {
		element.setAttribute("tabindex", "-1")
	})

	const modal = document.getElementById("contact_modal")
	modal.style.display = "block"
	modal.classList.replace("closed", "opened")
	modal.setAttribute("aria-hidden", "false")
	modal.focus()
	// Désactivation de l'accessibilité du contenu principal de la page
	const main = document.getElementById("main")
	main.setAttribute("aria-hidden", "true")
	main.classList.replace("opened", "closed")
	const header = document.querySelector("header")
	document.body.style.overflow = "hidden"
	main.style.opacity = "0.5"
	header.style.opacity = "0.5"
	// Fermer le modal lorsque la touche 'Escape' est pressée
	// Gestionnaire d'événements pour la touche "Escape"
	document.addEventListener("keydown", (e) => {
		const { key } = e
		if (key === "Escape") {
			closeModal()
		}
	})
}

const formElt = document.querySelector("form")
formElt.addEventListener("submit", (event) => {
	event.preventDefault()

	  let name = document.getElementById("firstName").value
	  let lastname = document.getElementById("LastName").value
	  let email = document.getElementById("email").value
	  // eslint-disable-next-line no-mixed-spaces-and-tabs
	  let message = document.getElementById("message").value

	  console.log("Prénom:", name)
	  console.log("Nom:", lastname)
	  console.log("Email:", email)
	  console.log("Message:", message)
	closeModal()
})
