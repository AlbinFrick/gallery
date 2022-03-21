import { toggleShowImageInModal, closeModal } from './modal'
import loading from '../assets/loading.svg'
import errorSvg from '../assets/error.svg'

/**
 * Builds the image gallery from the API response.
 */

export const buildImageCard = (photo) => {
	let img = document.createElement('img');
	img.setAttribute('data-src', photo.imgURL);
	img.setAttribute('src', loading);
	img.setAttribute('alt', photo.title);
	img.classList.add('lazy')
	img.classList.add('aspect1to1')

	img.addEventListener('error', (e) => {
		//Borde sättas till den lokal bild på någotvis
		img.src = errorSvg;
		img.classList.add('imgError');
		img.nextElementSibling.innerHTML = 'Trasig bild'
	})
	let imgContainer = document.createElement('figure');
	imgContainer.classList.add('imgContainer');
	imgContainer.tabIndex = 0;
	imgContainer.addEventListener('click', () => showImageInModal(imgContainer.children.item(0)))
	imgContainer.addEventListener('keydown', (e) => {
		if (e.key == 'Enter')
			toggleShowImageInModal(imgContainer.children.item(0))
		if (e.key == 'Escape')
			closeModal()

	})

	let title = document.createElement('figcaption');
	title.setAttribute('class', 'titleContainer')
	let titleText = document.createTextNode(photo.title ? photo.title : 'Ingen titel hittades');

	title.appendChild(titleText);
	imgContainer.appendChild(img);
	imgContainer.appendChild(title);
	gallery.appendChild(imgContainer);
}