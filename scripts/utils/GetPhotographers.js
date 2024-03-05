// une requête sur le fichier JSON en utilisant "fetch" pour récupérer les données
// et bien retourner l'objet contenant le tableau de "photographers" et le tableau des "média"
async function getPhotographers() {
  const response = await fetch('data/photographers.json');
  const jsonData = await response.json();
  const photographersArray = jsonData.photographers;
  const mediaArray = jsonData.media;
  return ({
    photographers: photographersArray, media: mediaArray,
  });
}
