export class Lightbox {

	static init() {
		const gallerySection = document.querySelector(".photographer-page__gallery");
		const links = Array.from(gallerySection.querySelectorAll('img[src$=".jpg"],source[src$=".mp4"]'));
		const gallery = links.map((link) => link.getAttribute("src"));
		links.forEach((link) => {
			link.addEventListener("click", (e) => {
				e.preventDefault();
				new Lightbox(e.currentTarget.getAttribute("src"), gallery, e.currentTarget.getAttribute("alt"));
				
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
	}
	
	
	constructor(url, gallery, alt) {
		
		this.element = this.buildBox(url, alt);
		this.gallery = gallery;
		/*this.alt = alt*/
		this.loadMedia(url, alt, gallery);
		this.formatSrcForMedia(url);
		this.onKeyUp = this.onKeyUp.bind(this);
		document.body.appendChild(this.element);
		document.addEventListener("keyup", this.onKeyUp);
	}

	formatSrcForMedia(src) {
		let lightboxMediaLink = src.split("/");
		lightboxMediaLink.splice(4, 0, "lightbox");
		const formatedLightboxMediaLink = lightboxMediaLink.join("/");
		return formatedLightboxMediaLink;
	}

	
	loadMedia(url, alt) {
		this.url = url;
		
		console.log(this.alt)
		if (url.endsWith(".mp4")) {
			const video = document.createElement("video");
			const container = this.element.querySelector(".lightbox__container");
			const legend = document.createElement("p");
			
			container.innerHTML = "";
			container.appendChild(video);
			container.appendChild(legend);
			video.setAttribute("controls", "");
			video.src = url;
		} else if (url.endsWith(".jpg")) {
			const image = document.createElement("img");
			const container = this.element.querySelector(".lightbox__container");
			const legend = document.createElement("p");
			legend.innerHTML = this.alt;
			console.log(this.alt);
			container.innerHTML = "";
			container.appendChild(image);
			container.appendChild(legend);
			image.src = url;
			image.classList.add("lightbox__container__img");
		}
	}


	
	onKeyUp(e) {
		if (e.key === "Escape") {
			this.close(e);
		} else if (e.key === "ArrowLeft") {
			this.next(e);
		} else if (e.key === "ArrowRight") {
			this.previous(e);
		}
	}

	
	close(e) {
		e.preventDefault();
		this.element.classList.add("fadeOut");
		window.setTimeout(() => {
			this.element.parentElement.removeChild(this.element);
		}, 500);
		document.removeEventListener("keyup", this.onKeyUp);
	}

	
	next(e) {
		e.preventDefault();
		let i = this.gallery.findIndex((image) => image === this.url);
		
		if (i === this.gallery.length - 1) {
			i = -1;
		}
		this.loadMedia(this.gallery[i + 1]);
		console.log(this.gallery)
	}


	previous(e) {
		e.preventDefault();
		let i = this.gallery.findIndex((image) => image === this.url);
		if (i === 0) {
			i = this.gallery.length;
		}
		this.loadMedia(this.gallery[i - 1]);
	}

	
	buildBox() {
		const box = document.createElement("div");
		box.classList.add("lightbox");
		box.innerHTML = `
    <a class="lightbox__close" aria-label="fermer"><i class="fa-solid fa-xmark"></i></a>
    <a class="lightbox__next" aria-label="suivant"><i class="fa-solid fa-arrow-right"></i></a>
    <a class="lightbox__previous" aria-label="précédent" tabindex="1"><i class="fa-solid fa-arrow-left"></i></a>
    <div class="lightbox__container">
    <p class="lightbox__container__img-title"></p>
    </div>`;
	box.querySelector(".lightbox__close").addEventListener("click", this.close.bind(this));
	box.querySelector(".lightbox__next").addEventListener("click", this.next.bind(this));
	box.querySelector(".lightbox__previous").addEventListener("click", this.previous.bind(this));
		return box;
	}
	
}
