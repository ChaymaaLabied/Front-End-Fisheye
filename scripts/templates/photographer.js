// Enregistre l'id de l'image selectionnée dans la lightbox
let selectedMediaId
// a quoi sert la grande fonction
function photographerTemplate(photographerData, mediaList) {
    const { name, portrait, city, country, tagline, price, id } = photographerData

    const picture = `assets/photographers/${portrait}`
    // créer la carte des photographers dans la page principale et 
    // retourne la carte de chaque photographer (lien  cliquable)
    function getUserCardDOM() {
        const aElement = document.createElement('a')
        aElement.setAttribute("href", `/photographer.html?id=${id}`)
        const article = document.createElement('article')
        const img = document.createElement('img')
        img.setAttribute("src", picture)
        const h2 = document.createElement('h2')
        h2.textContent = name
        article.appendChild(img)
        article.appendChild(h2)
        const cityAndCountry = document.createElement('p')
        cityAndCountry.textContent = `${city} , ${country}`
        article.appendChild(cityAndCountry)
        const taglineElement = document.createElement('p')
        taglineElement.textContent = tagline
        article.appendChild(taglineElement)
        const priceElement = document.createElement('p')
        priceElement.textContent = `${price}€/jour`
        article.appendChild(priceElement)
        aElement.appendChild(article)
        return (aElement)
    }
    // afficher les elements du photographers dans photographer.html
    function displayPhotographerDetailsDOM() {
        // récuperer les élements du photographers-details affichées dans photographer .html
        const img = document.querySelector('#photographer-details > img')
        img.setAttribute("src", picture)
        const h2 = document.querySelector('#photographer-details > h2')
        h2.textContent = name
        const cityAndCountry = document.querySelector('#photographer-details > .location')
        cityAndCountry.textContent = `${city} , ${country}`
        const taglineElement = document.querySelector('#photographer-details > .tagLine')
        taglineElement.textContent = tagline

        const select = document.querySelector('#photographer-details > select')
        select.addEventListener('change', (e) => {
            const sortType = e.target.value
            switch (sortType) {
                case 'Date':
                    mediaList.sort(sortByDate)
                    break
                case 'Titre':
                    mediaList.sort(sortByTitre)
                    break
                case 'Popularité':
                    mediaList.sort(sortByPopularity)
                    break
            }
            displayPhotographerMediasDOM()
        })
    }

    function displayPhotographerMediasDOM() {
        let totalLikes = 0
        const photographeHeader = document.querySelector(".media-list")
        photographeHeader.textContent = ''
        mediaList.forEach((elt) => {
            const mediaModel = mediaTemplate(elt)
            const userMediaDom = mediaModel.getmedia()
            photographeHeader.appendChild(userMediaDom)
            totalLikes += elt.likes
        })
        return totalLikes
    }

    function setLightBoxListeners() {
        const prevButton = document.getElementById('prev')
        const nextButton = document.getElementById('next')
        function defiler(direction) {
            const currentMediaIndex = mediaList.findIndex(elt => elt.id === parseInt(selectedMediaId))
            let media
            if (direction === 'previous') {
                media = currentMediaIndex > 0 ? mediaList[currentMediaIndex - 1] : mediaList[mediaList.length - 1]
            } else if (direction === 'next') {
                media = currentMediaIndex === mediaList.length - 1 ? mediaList[0] : mediaList[currentMediaIndex + 1]
            }
            const mediaLightBoxElt = document.querySelector('.defilement > img')
            const videoElement = document.querySelector('#video-lightbox')
            const sourceElement = document.querySelector('#video-lightbox source')
            console.log(media)
            if (media.image) {
                videoElement.style.display = 'none'
                mediaLightBoxElt.style.display = 'block'
                mediaLightBoxElt.setAttribute('src', `assets/media/${id}/${media.image}`)
            } else if (media.video) {
                mediaLightBoxElt.style.display = 'none'
                videoElement.style.display = 'block'
                sourceElement.setAttribute('src', `assets/media/${id}/${media.video}`)
            }
            selectedMediaId = media.id
        }
        prevButton.addEventListener('click', () => {
            defiler('previous')
        })
        nextButton.addEventListener('click', () => {
            defiler('next')
        })
        // document.addEventListener('click', () => {
        //     defiler('previous')
        // })

    }

    return { name, picture, getUserCardDOM, displayPhotographerDetailsDOM, displayPhotographerMediasDOM, setLightBoxListeners }
}

function mediaTemplate(mediaData) {
    let { photographerId, title, likes, id } = mediaData
    function getmedia() {
        const article = document.createElement('article')
        if (mediaData.image) {
            const pics = `assets/media/${photographerId}/${mediaData.image}`
            const img = document.createElement('img')
            img.setAttribute("src", pics)
            img.classList.add("media")
            img.setAttribute('data-id', id)
            img.addEventListener('click', (event) => {
                displayLightbox()
                const imageLightBox = document.querySelector('.defilement > img')
                imageLightBox.style.display = 'block'
                imageLightBox.setAttribute('src', event.target.src)
                selectedMediaId = event.target.dataset.id// a changer apres 
            })
            article.appendChild(img)
        } else {
            const vidd = `assets/media/${photographerId}/${mediaData.video}`
            const video = document.createElement('video')
            const source = document.createElement('source')
            source.setAttribute("src", vidd)
            source.setAttribute("type", "video/mp4")
            source.classList.add("media")
            source.setAttribute('data-id', id)
            video.setAttribute("controls", true)
            video.appendChild(source)
            video.addEventListener('click', (event) => {
                displayLightbox()
                const videoElement = document.querySelector('#video-lightbox')
                const sourceElement = document.querySelector('#video-lightbox source')
                sourceElement.setAttribute('src', event.target.src)
                videoElement.style.display = 'block'
                selectedMediaId = event.target.dataset.id
            })
            article.appendChild(video)
        }

        const h2 = document.createElement('h2')
        const likesElt = document.createElement('div')
        const iconLikes = document.createElement('i')
        const nbLikeElt = document.createElement('span')
        h2.textContent = title
        nbLikeElt.textContent = likes
        iconLikes.setAttribute("class", "fa-solid fa-heart")
        article.appendChild(h2)
        likesElt.appendChild(nbLikeElt)
        likesElt.appendChild(iconLikes)

        article.appendChild(likesElt)

        function likesIncrementation(e) {
            likes++
            nbLikeElt.textContent = likes
            const totalLikesElement = document.getElementById('totalLikes')
            totalLikesElement.textContent = parseInt(totalLikesElement.textContent) + 1
            iconLikes.removeEventListener('click', likesIncrementation)
        }
        iconLikes.addEventListener('click', likesIncrementation)

        return (article)
    }
    return { getmedia }
}


function getEncartPhotographer(totalLikes, price) {

    const encart = document.createElement('div')
    const totalLikesElement = document.createElement('span')
    const nbLikes = document.createElement('span')
    nbLikes.setAttribute("id", "totalLikes")
    const iconLikes = document.createElement('i')
    nbLikes.textContent = totalLikes
    const priceElement = document.createElement('span')
    priceElement.textContent = ` ${price}€/jour `
    iconLikes.setAttribute("class", "fa-solid fa-heart")
    totalLikesElement.appendChild(nbLikes)
    totalLikesElement.appendChild(iconLikes)
    encart.appendChild(totalLikesElement)
    encart.appendChild(priceElement)


    return (encart)
}

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