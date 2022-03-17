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
	setLoaderMessage('Hämtar bilder från Flickr...')
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

const buildImageCard = (photo) => {
	let img = document.createElement('img');
	img.setAttribute('data-src', photo.imgURI + '_m.jpg');
	img.setAttribute('alt', photo.title);
	img.classList.add('lazy')
	img.classList.add('loader')

	img.addEventListener('error', (e) => {
		//Borde sättas till den lokal bild på någotvis
		img.src = 'https://thumbs.dreamstime.com/b/error-rubber-stamp-word-error-inside-illustration-109026446.jpg'
		img.nextElementSibling.innerHTML = 'Ingen bild hittades'
	})

	let imgContainer = document.createElement('figure');
	imgContainer.classList.add('imgContainer');
	imgContainer.tabIndex = 0;
	imgContainer.addEventListener('click', () => toggleImg(imgContainer))

	let title = document.createElement('figcaption');
	title.setAttribute('class', 'titleContainer')
	let titleText = document.createTextNode(photo.title ? photo.title : 'Ingen titel hittades');

	title.appendChild(titleText);
	imgContainer.appendChild(img);
	imgContainer.appendChild(title);
	gallery.appendChild(imgContainer);
}


const setErrorMessage = (message) => {
	document.getElementById('errorMessage').innerHTML = message
}
const setLoaderMessage = (message) => {
	document.getElementById('loading').innerHTML = message
}

const fetchImages = (page, search) => {
	fetch(`http://localhost:8080/search-image/${search}/40/${page}`).then((res) => {
		if (!res.ok) {
			throw new Error(`${res.status}, Whoops kunde inte hämta dina bilder.`);
		}
		setErrorMessage('')
		return res.json()
	}).then((response) => {
		setLoaderMessage('')
		response.map((photo) => {
			buildImageCard(photo)
		})
		lazyload()
		document.addEventListener("scroll", lazyload);
		window.addEventListener("resize", lazyload);

	}).catch((error) => {
		console.log(error)
		setErrorMessage(error.message)
		setLoaderMessage('')
	})
}
