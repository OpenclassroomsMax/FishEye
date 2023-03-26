//Mettre le code JavaScript lié à la page photographer.html
import { Photographer } from "../factories/photographer.js";
import { Lightbox } from "../utils/lightbox.js";
import { MediaFactory } from "../factories/media.js";

async function getData() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".

        const data = await fetch("./data/photographers.json") 
        .then((res)=> res.json())
        .then((data) =>{
            return data
        } )
        /*console.log ("data = ",data)*/
        
        /*console.log(data.photographers)*/
    return data
}

const filter = (mediaAll, option) => {
	switch (option) {
		case "popularity":
			return mediaAll.sort((a, b) => {
                console.log(a,b)
				return b.likes - a.likes;
			});
		case "date":
			return mediaAll.sort((a, b) => {
				return new Date(b.date) - new Date(a.date);

			});
		case "title":
			return mediaAll.sort((a, b) => a.title.localeCompare(b.title));
		default:
			return mediaAll.sort((a, b) => {
				return b.likes - a.likes;

			});
	}
};

function shearchId(){

    let params = new URLSearchParams(document.location.search.substring(1));
    let id = params.get('id'); // la chaine de caractère "Jonathan Smith".
    console.log(id)
    return id
}

async function init() {
    // Récupère les datas des photographes
    const photographersHeader = document.querySelector(".photograph-header");
    const photographersFooter = document.querySelector(".photographer-page__footer-section");

    const  {photographers,media}  = await getData();
    const idphotographer = shearchId();

    const found = photographers.find(photographer => photographer.id == idphotographer );
    
    const photographerProfil = new Photographer(found);
    const headerphotographer = photographerProfil.createHeader();
    const footerphotographer = photographerProfil.createFooter();

    photographersHeader.innerHTML=photographersHeader.innerHTML+(headerphotographer);
    photographersFooter.innerHTML=photographersFooter.innerHTML+(footerphotographer);

    const mediaAll = media.filter(media => media.photographerId == idphotographer);
    
    

    document.addEventListener("change", function (event) {
        const Gallery = document.querySelector(".photographer-page__gallery");
		Gallery.innerHTML=""
		const option = filter(mediaAll, event.target.value);
		mediaDisplay(option);
        Lightbox.init(option)
        eventheart();
        
	});

	mediaDisplay(mediaAll);
    eventheart();
    likeAll()
    Lightbox.init();

}

function likeAll(){
    const totalLikesElements = document.querySelectorAll(
        ".photographer-page_Media_numLikes"
    )
    const result = document.querySelector(
        ".photographer-page__footer__aside__total-likes"
    )
    console.log(totalLikesElements)
    let likeSum = 0;
    totalLikesElements.forEach(function (like) {
        likeSum += Number(like.textContent)
    });
    result.innerHTML = likeSum
}   

function eventheart(){
    console.log("eventheart()")
    const links = Array.from(document.querySelectorAll(".photographer-page_Media_likesection"));
    links.forEach((link) => {

        link.addEventListener("click", function(event) {
            const likebase = link.firstChild.nextSibling.innerHTML;
            const numberlike = parseInt(likebase);
            /*console.log(link)
            console.log(link.firstChild)*/
            console.log(likebase)
            console.log(likebase.textContent)
            
            link.firstChild.nextSibling.innerHTML = numberlike + 1;
            likeAll()

            event.preventDefault();
        });
    });
}

/*static init() {
    const gallerySection = document.querySelector(".photographer-page__gallery");
    const links = Array.from(gallerySection.querySelectorAll('img[src$=".jpg"],source[src$=".mp4"]'));
    const gallery = links.map((link) => link.getAttribute("src"));
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            new Lightbox(e.currentTarget.getAttribute("src"), gallery);
        });
        link.addEventListener("keyup", (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                new Lightbox(e.currentTarget.getAttribute("src"), gallery);
            } else {
                return;
            }
        });
    });
}*/



function mediaDisplay(gallery) {
    console.log(gallery)
	gallery.forEach((media) => {
        /*console.log(media)*/
		const medias = new MediaFactory(media);
        /*console.log(medias)*/
		const buildMedia = medias.createHtml();
        const Gallery = document.querySelector(".photographer-page__gallery");
        Gallery.innerHTML=Gallery.innerHTML+(buildMedia);
        /*console.log(medias)*/

	});
}

init();
