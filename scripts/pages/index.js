
//la déclaration de la fonction qui va afficher les data des photgraphers dans index.html
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section")

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer) 
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

async function init() {
  //la déclaration de la focntion qui  Récupère les datas des photographes
  //les acolades destructuring stuffs eviter test point === (await getPhotographers()).photographers
  const { photographers } = await getPhotographers() 
 // l'appel de la fonction displayData
  displayData(photographers)
}

// l'appel de la fonction init
init()