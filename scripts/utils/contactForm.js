function displayModal() {
  //Désactivation du focus sur certains éléments :
  const focusableElements = document.querySelectorAll(
    '.btn_list, .menu-item, article,[tabindex]:not([tabindex="-1"]),.photograph-header button'
  );
  focusableElements.forEach((element) => {
    element.setAttribute("tabindex", "-1");
  });

  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.classList.replace("closed", "opened");
  modal.setAttribute("aria-hidden", "false");
  // modal.setAttribute('tabindex', '0');
  modal.focus();
  // Désactivation de l'accessibilité du contenu principal de la page
  const main = document.getElementById("main");
  main.setAttribute("aria-hidden", "true");
  // main.setAttribute("tabindex", "-1");
  main.classList.replace("opened", "closed");
  const header = document.querySelector("header");
  document.body.style.overflow = "hidden";
  main.style.opacity = "0.5";
  header.style.opacity = "0.5";
  // Fermer le modal lorsque la touche 'Escape' est pressée
  //Gestionnaire d'événements pour la touche "Escape"
  document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (key === "Escape")
      //modal.getAttribute('aria-hidden') == 'false' &&
      closeModal();
  });
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.classList.replace("opened", "closed");
  modal.setAttribute("aria-hidden", "true");
  // modal.setAttribute('tabindex', '-1');

  const main = document.getElementById("main");
  main.style.opacity = "1";
  main.setAttribute("aria-hidden", "false");
  // main.setAttribute('tabindex', '0');
  main.classList.replace("closed", "opened");
  const header = document.querySelector("header");
  header.style.opacity = "1";
  document.body.style.overflow = "";

  const btnOpen = document.querySelector(".contact_button");
  btnOpen.focus();
  const focusableElements = document.querySelectorAll(
    '.btn_list, .menu-item, article , [tabindex]:not([tabindex="-1"]),.photograph-header button'
  );
  focusableElements.forEach((element) => {
    element.setAttribute("tabindex", "0");
  });

  let name = document.getElementById("firstName").value;

//   const lastname = document.getElementById("LastName").value;
//   const email = document.getElementById("email").value;
//   const message = document.getElementById("message").value;
//   name = ''
}

const formElt = document.querySelector("form");
formElt.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  let prenom = data.get("firstName")
  let nom = data.get("LastName")
  let email = data.get("email")
  let message = data.get("message")
  console.log("Prénom:",prenom);
  console.log("Nom:", nom);
  console.log("Email:", email);
  console.log("Message:",message);

//   let name = document.getElementById("firstName").value;
//   let lastname = document.getElementById("LastName").value;
//   let email = document.getElementById("email").value;
//   let message = document.getElementById("message").value;

//   console.log("Prénom:", name);
//   console.log("Nom:", lastname);
//   console.log("Email:", email);
//   console.log("Message:", message);
  closeModal();
});
