// Enregistre l'id de l'image selectionnée dans la lightbox
let selectedMediaId
// a quoi sert la grande fonction
function photographerTemplate(photographerData) {
  const { name, portrait, city, country, tagline, price, id } = photographerData

  const picture = `assets/photographers/${portrait}`
  // créer la carte des photographers dans la page principale index.html et
  // retourne la carte de chaque photographer (lien  cliquable)
  function getUserCardDOM() {
    const aElement = document.createElement("a")
    aElement.setAttribute("href", `/photographer.html?id=${id}`)
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
    const h2 = document.querySelector(".photographerName")
    h2.textContent = name
    const cityAndCountry = document.querySelector(
      ".location"
    )
    cityAndCountry.textContent = `${city} , ${country}`
    const taglineElement = document.querySelector(
      ".tagLine"
    )
    taglineElement.textContent = tagline
  }

  return {
    name,
    picture,
    getUserCardDOM,
    displayPhotographerDetailsDOM,
  }
}

function mediaTemplate(mediaData) { // cette fct prend comme para les elements du mediaList se sont des data
    // pas des elements dom that's why on les nomme Data
  let { photographerId, title, likes, id } = mediaData
  // afficher toutes les media soit photo soit video dans le dossier de chaque photographer
  // avec l'appel a la fct du lancement du lightBox lors du Click
  function getmedia() {
    const article = document.createElement("article")
    if (mediaData.image) {
      const pics = `assets/media/${photographerId}/${mediaData.image}`
      const img = document.createElement("img")
      img.setAttribute("src", pics)
      img.classList.add("media")
      img.addEventListener("click", (event) => {
        displayLightbox()
        const imageLightBox = document.querySelector(".defilement > img")
        imageLightBox.style.display = "block"
        imageLightBox.setAttribute("src", event.target.src)
        selectedMediaId = id 
      })
      article.appendChild(img)
    } else {
      const vidd = `assets/media/${photographerId}/${mediaData.video}`
      const video = document.createElement("video")
      const source = document.createElement("source")
      source.setAttribute("src", vidd)
      source.setAttribute("type", "video/mp4")
      source.classList.add("media")
      video.setAttribute("controls", true)
      video.appendChild(source)
      video.addEventListener("click", (event) => {
        displayLightbox()
        const videoElement = document.querySelector("#video-lightbox")
        const sourceElement = document.querySelector("#video-lightbox source")
        sourceElement.setAttribute("src", event.target.src)
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
    function likesIncrementation(e) {
      likes++
      nbLikeElt.textContent = likes
      const totalLikesElement = document.getElementById("totalLikes")
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


    const encart = document.querySelector('.encart')
    const totalLikesElement= document.querySelector('.totalLikesElement')
    let nbLikes = document.querySelector('.totalLikes')
    nbLikes.textContent = totalLikes
    const iconLikes = document.querySelector('.icon')
    const priceElement = document.querySelector('.PricePerDay')
    priceElement.textContent = ` ${price}€/jour `
    totalLikesElement.appendChild(nbLikes)
    totalLikesElement.appendChild(iconLikes)
    encart.appendChild(totalLikesElement)
    encart.appendChild(priceElement)



  return encart
}
function sortMediaList(mediaList) {
  // Fonctions de tri
  function sortByDate(a, b) {
    if (a.date < b.date) {
      return -1
    } else if (a.date > b.date) {
      return 1
    }
    return 0
  }
  function sortByTitre(a, b) {
    if (a.title < b.title) {
      return -1
    } else if (a.title > b.title) {
      return 1
    }
    return 0
  }
  function sortByPopularity(a, b) {
    if (a.likes < b.likes) {
      return -1
    } else if (a.likes > b.likes) {
      return 1
    }
    return 0
  }
  // est ce que je peux mettre ce code dans une focntion separée ?
  // cette fonction point sur le select , pose une variable qui point sur la valeur de cette select puis pose
  // un eventlistner et un switch case sur les choix de l'utilisateur , on applique la fonction associé du tri
  // a chaque cas et puis on affiche dans le DOM les elements triés .
  const select = document.querySelector("#photographer-filter")
  select.addEventListener("change", (e) => {
    const sortType = e.target.value
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
}
function setLightBoxListeners(mediaList,id) {
    
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
          currentMediaIndex > 0
            ? mediaList[currentMediaIndex - 1]
            : mediaList[mediaList.length - 1]
      } else if (direction === "next") {
        // la meme chose ici mais à l'envers
        // media reçois le premier element si on est sur la derniere photo
        media =
          currentMediaIndex === mediaList.length - 1
            ? mediaList[0]
            : mediaList[currentMediaIndex + 1]
      }
      const mediaLightBoxElt = document.querySelector(".defilement > img") //modifier le nom imgLightBoxElt
      const videoElement = document.querySelector("#video-lightbox") // vidLightBoxElt
      const sourceElement = document.querySelector("#video-lightbox source") //srcVideoElt
      console.log(media)
      if (media.image) {
        videoElement.style.display = "none"
        mediaLightBoxElt.style.display = "block"
        mediaLightBoxElt.setAttribute(
          "src",
          `assets/media/${id}/${media.image}`
        )
      } else if (media.video) {
        mediaLightBoxElt.style.display = "none"
        videoElement.style.display = "block"
        sourceElement.setAttribute("src", `assets/media/${id}/${media.video}`)
      }
      selectedMediaId = media.id
    }
    prevButton.addEventListener("click", () => {
      defiler("previous") // l'appel de la fonction défiler
    })
    nextButton.addEventListener("click", () => {
      defiler("next")
    })
    // document.addEventListener('click', () => {
    //     defiler('previous')
    // })
  }