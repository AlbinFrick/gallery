/**
 * This file handles the lazy loading of the images in the gallery.
 * This version uses the intersectionObserver for observing if an image are close to the viewport and thereby should load.
 * When all images are loaded in to the page more are fetched from the API.
 */
import { fetchNextPage } from "./fetchFromAPI";

export const lazyload = () => {
	let lazyImages = document.querySelectorAll('.lazy')
	const lazyImageObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			// Updates how many images are to load
			lazyImages = document.querySelectorAll('.lazy')

			if (entry.isIntersecting) {
				let img = entry.target;
				// Sets the data-src as src and adds the size suffix and extension
				img.setAttribute('src', img.getAttribute('data-src') + '_m.jpg')
				img.classList.remove('lazy')
				lazyImageObserver.unobserve(entry.target)
				// If there are not more images to lazy load fetch more from the API
				if (lazyImages.length == 1)
					fetchNextPage()
			}
		})
	}, {
		rootMargin: '200px'
	})

	lazyImages.forEach(lazyImage => {
		lazyImageObserver.observe(lazyImage)
	})
}