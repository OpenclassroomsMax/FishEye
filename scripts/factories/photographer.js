// function photographerFactory(data) {
//     const { name, portrait } = data;

//     const picture = `assets/photographers/${portrait}`;

//     function getUserCardDOM() {
//         const article = document.createElement( 'article' );
//         const img = document.createElement( 'img' );
//         img.setAttribute("src", picture)
//         const h2 = document.createElement( 'h2' );
//         h2.textContent = name;
//         article.appendChild(img);
//         article.appendChild(h2);
//         return (article);
//     }
//     return { name, picture, getUserCardDOM }
// }

export class Photographer {

    constructor(data){
        this._name = data.name
        this._id = data.id
        this._city = data.city
        this._country = data.country
        this._tagline = data.tagline
        this._price = data.price
        this._portrait = data.portrait
    }
    
    picture() {
        return `../assets/photographers/${this._portrait}`
    }
    /** 
     *@returns {string}
     */

    createhtml() {
        return `
        <article class="photographer">
            <a href="photographer.html?id=${this._id}" tabindex="1" class="focus__element" aria-label="Aller sur la page de ${this._name} basé à ${this._city},${this._country} sont tarif journalier est de ${this._price} euro par jour. Sa spécialité est ${this._tags} et sa devise ${this._tagline}">
                <img class="photographers__img" src="${this.picture()}" alt="Photographie de profil de ${this._name}">
                <h2>${this._name}</h2>
            </a>
            <p class="photographers__localization">${this._city},${this._country}</p>
            <p class="photographers__tagline">${this._tagline}</p>
            <p class="photographers__price">${this._price}€/jour</p>
        </article>
        `
    }

    createHeader(){
        return`
            <div class="photographer-page__header__content">
                <h1 class="photographer-page__header__title">${this._name}</h1>
                <p class="photographer-page__header__localization">${this._city},${this._country}</p>
                <p class="photographer-page__header__tagline">${this._tagline}</p>
            </div>
            <button class="contact_button" tabindex="4" onclick="displayModal()">Contactez-moi</button>
            <img src="${this.picture()}" class="photographer-page__header__photo" alt="Photographie de profil de ${this._name}">

        `
    }
    createFooter() {
        
        return `
        <section class="photographer-page__footer">
            <aside class="photographer-page__footer__aside">
            <p class="photographer-page__footer__aside__total-likes" aria-label="Nombre total de j'aime ${this.likeSum}" tabindex="6">${this.likeSum}</p>
            <i class="fas fa-heart" aria-hidden="true"></i>
            </aside>
            <p class="photographer-page__footer__price" tabindex="7" aria-label="Tarif du photographe ${this._price} euro par jour">${this._price}€/jour</p>
        </section>
        `
    }

    /*userReloadLikes() {
		const totalLikesElements = document.querySelectorAll(
			".photographer-page_Media_numLikes"
		)
        console.log(totalLikesElements)
		const likeSum = 0;
		totalLikesElements.forEach(function (like) {
			const likeUnit = Number(like.textContent)
			likeSum += likeUnit
		});
		return likeSum
	}*/        
}


/*object assign*/
