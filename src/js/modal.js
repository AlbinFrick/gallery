/**
 * Logic for an image preview modal. 
 * This modal shows the image in a higher resolution. 
 * The modal closes by clicking outside the image, pressing enter or escape. 
 */

var modal = document.getElementById('image-modal');
var modalImage = document.getElementById('modalImg');

const initializeModal = () => {
	modal.addEventListener('click', (e) => {
		if (e.target !== modalImage) {
			modal.classList.remove('modal-open')
			modalImage.src = ''
		}
	})
}

export const showImageInModal = (img) => {
	initializeModal()
	modalImage.src = '';
	modalImage.src = img.getAttribute('data-src') + '_c.jpg'
	modal.classList.add('modal-open')
}


export const toggleShowImageInModal = (img) => {
	initializeModal()
	modalImage.src = '';
	modalImage.src = img.getAttribute('data-src') + '_c.jpg'
	modal.classList.toggle('modal-open')
}

export const closeModal = () => {
	modal.classList.remove('modal-open')
	modalImage.src = '';
}


