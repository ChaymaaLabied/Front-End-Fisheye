function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const formElt = document.querySelector('form')
formElt.addEventListener('submit',(event)=>{
event.preventDefault()
const data = new FormData(event.target)
console.log(data.get("name"))
console.log(data.get("lastName"))
console.log(data.get("email"))
console.log(data.get("message"))
closeModal()
})


