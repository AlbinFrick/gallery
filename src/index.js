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




const toggleImg = (imgContainer) => {
	imgContainer.classList.contains('big') ? imgContainer.classList.remove('big') : imgContainer.classList.add('big')
}

var lazyloadThrottleTimeout;
const lazyload = () => {
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
			page = page + 1
			fetchImages(page, search)
			document.removeEventListener("scroll", lazyload);
			window.removeEventListener("resize", lazyload);
		}
	}, 20);
}

const buildImage = (photo) => {
	let imgContainer = document.createElement('figure');
	imgContainer.classList.add('imgContainer');
	let img = document.createElement('img');
	img.setAttribute('data-src', photo.imgURI + '_m.jpg');
	img.setAttribute('alt', photo.title);
	img.classList.add('lazy')
	img.classList.add('loader')
	imgContainer.addEventListener('click', () => toggleImg(imgContainer))
	let title = document.createElement('figcaption');
	title.setAttribute('class', 'titleContainer')
	const titleText = document.createTextNode(photo.title ? photo.title : 'Ingen titel hittades');
	title.appendChild(titleText);
	imgContainer.appendChild(img);
	imgContainer.appendChild(title);
	gallery.appendChild(imgContainer);
}

const fetchImages = (page, search) => {
	fetch(`http://localhost:8080/search-image/${search}/30/${page}`).then((res) => {
		return res.json()
	}).then((response) => {
		document.getElementById('loading').setAttribute('class', 'hide');
		response.map((photo) => {
			buildImage(photo)
		})
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
