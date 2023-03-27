/*factory patern*/
/* eslint-disable */
export class MediaFactory {

	constructor(data) {

		console.log(data.image)
		if (data.hasOwnProperty("image")){
			return new Picture(data);
		} else if (data.hasOwnProperty("video")) {
			return new Video(data);
		} else {
			throw "Unknown type format";
		}

	}
}

class Picture {
	
	constructor(data) {
		this._imgId = data.id
		this._imgPhotographerId = data.photographerId;
		this._imgTitle = data.title;
		this._imgSrc = data.image;
		this._imgLikes = data.likes;
		this._imgDate = data.date;
		this._imgPrice = data.price;
	}
	createHtml() {
		return `
        <div class="photographer-page_Media_card" >
            <img class="photographer-page_media_Picture focus__element" aria-label="${this._imgTitle}" src="./assets/medias/${this._imgPhotographerId}/${this._imgSrc}" tabindex="5" alt="${this._imgTitle}"/>
            <div class="photographer-page_Media_text">
                <p class="photographer-page_Media_title">${this._imgTitle}</p>
                <aside class="photographer-page_Media_likesection">
                    <p class="photographer-page_Media_numLikes">${this._imgLikes}</p>
                    <button class="photographer-page_Media_Like focus__element" tabindex="5" aria-label="Ajouter un j'aime"><i class="fa-solid fa-heart"></i></button>
                </aside>
            </div>
        </div>
        `;
	}
}



class Video {

	constructor(data) {
		this._videoId = data.id;
		this._videoPhotographerId = data.photographerId;
		this._videoTitle = data.title;
		this._videoSrc = data.video;
		this._videoLikes = data.likes;
		this._videoDate = data.date;
		this._priceVideo = data.price;
	}

	createHtml() {
		return `
        <div class="photographer-page_Media_card" >
            <video class="photographer-page_media_Picture focus__element" tabindex="5" aria-label="${this._videoTitle}">
                <source src="./assets/medias/${this._videoPhotographerId}/${this._videoSrc}"/>
            </video>
            <div controls class="photographer-page_Media_text">
                <p class="photographer-page_Media_text">${this._videoTitle}</p>
                <aside class="photographer-page_Media_likesection">
                    <p class="photographer-page_Media_numLikes">${this._videoLikes}</p>
                    <button class="photographer-page_Media_Like focus__element" tabindex="5" aria-label="Ajouter un j'aime"><i class="fa-solid fa-heart"></i></button>
                </aside>
            </div>
        </div>
        `;
	}
}
