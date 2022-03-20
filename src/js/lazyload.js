import { fetchNextPage } from "./fetchFromAPI";

// var lazyloadThrottleTimeout;
export const lazyload = () => {
	let lazyImages = document.querySelectorAll('.lazy')
	const lazyImageObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			lazyImages = document.querySelectorAll('.lazy');
			if (entry.isIntersecting) {
				let img = entry.target;
				img.setAttribute('src', img.getAttribute('data-src'))
				img.classList.remove('lazy')
				lazyImageObserver.unobserve(img)
				if (lazyImages.length == 1)
					fetchNextPage()
			}
		})
	}, {
		rootMargin: '200px'
	}
	)

	lazyImages.forEach(lazyImage => {

		lazyImageObserver.observe(lazyImage)
	})





	// lazyloadImages = Array.prototype.slice.call(lazyloadImages)
	// if (lazyloadThrottleTimeout) {
	// 	clearTimeout(lazyloadThrottleTimeout);
	// }
	// lazyloadThrottleTimeout = setTimeout(function () {
	// 	var scrollTop = window.pageYOffset;
	// 	lazyloadImages.forEach(function (img) {
	// 		if (img.offsetTop < (window.innerHeight + scrollTop)) {
	// 			img.src = img.dataset.src;
	// 			img.classList.remove('lazy');
	// 		}
	// 	});
	// 	if (lazyloadImages.length == 0) {
	// 		fetchNextPage(search)
	// 		document.removeEventListener("scroll", lazyload);
	// 		window.removeEventListener("resize", lazyload);
	// 	}
	// }, 20);
}