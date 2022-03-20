const toggleImg = (imgContainer) => {
	imgContainer.classList.contains('big') ? imgContainer.classList.remove('big') : imgContainer.classList.add('big')
}


export const buildImageCard = (photo) => {
	let img = document.createElement('img');
	img.setAttribute('data-src', photo.imgURI + '_m.jpg');
	img.setAttribute('alt', photo.title);
	img.classList.add('lazy')
	img.classList.add('loader')

	img.addEventListener('error', (e) => {
		//Borde sättas till den lokal bild på någotvis
		img.src = 'https://thumbs.dreamstime.com/b/error-rubber-stamp-word-error-inside-illustration-109026446.jpg'
		img.nextElementSibling.innerHTML = 'Trasig bild'
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