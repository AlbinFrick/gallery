import './style/style.scss';


let gallery = document.getElementById('gallery');

let page;
let search;

let form = document.getElementById('form');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	gallery.innerHTML = ''
	search = document.getElementById('search').value;
	page = 1;
	document.getElementById('loading').setAttribute('class', 'show');
	fetchImages(page, search)
})


const imgError = () => {
	console.log('error loading image')
}

const fetchImages = (page, search) => {
	fetch(`http://localhost:8080/search-image/${search}/30/${page}`).then((res) => {
		return res.json()
	}).then((response) => {
		console.log(response)
		console.log(page)
		page++
		document.getElementById('loading').setAttribute('class', 'hide');

		response.map((photo) => {
			let imgContainer = document.createElement('div');
			imgContainer.classList.add('imgContainer');
			let img = document.createElement('img');
			img.setAttribute('data-src', photo.imgURI);
			img.setAttribute('alt', photo.title);
			img.classList.add('lazy')
			img.classList.add('loader')
			let titleContainer = document.createElement('div');
			titleContainer.setAttribute('class', 'titleContainer')
			let title = document.createElement('p');
			const titleText = document.createTextNode(photo.title);
			title.appendChild(titleText);
			titleContainer.appendChild(title);
			imgContainer.appendChild(img);
			imgContainer.appendChild(titleContainer);
			gallery.appendChild(imgContainer);
		})


		// var lazyloadImages = document.getElementsByClassName('lazy')
		// lazyloadImages = Array.prototype.slice.call(lazyloadImages)
		// console.log(lazyloadImages)

		var lazyloadThrottleTimeout;


		function lazyload() {
			var lazyloadImages = document.getElementsByClassName('lazy')
			lazyloadImages = Array.prototype.slice.call(lazyloadImages)
			if (lazyloadThrottleTimeout) {
				clearTimeout(lazyloadThrottleTimeout);
			}
			lazyloadThrottleTimeout = setTimeout(function () {
				var scrollTop = window.pageYOffset;
				lazyloadImages.forEach(function (img) {
					if (img.offsetTop < (window.innerHeight + scrollTop)) {
						img.src = img.dataset.src;
						img.classList.remove('lazy');
					}
				});
				if (lazyloadImages.length == 0) {
					fetchImages(page, search)
					document.removeEventListener("scroll", lazyload);
					window.removeEventListener("resize", lazyload);
				}
			}, 20);
		}
		lazyload()

		document.addEventListener("scroll", lazyload);
		window.addEventListener("resize", lazyload);

	}).catch((error) => {
		console.log(error)
		var err = document.createAttribute('div');
		const errText = document.createTextNode('Kunde tyvärr inte hämta några bilder. Prova att ladda om din webbläsare.');
		err.appendChild(errText)
		gallery.appendChild(err)

	})
}
