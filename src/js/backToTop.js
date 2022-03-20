
/**
 * Functionality for scroll to top button.
 * Shows the button if the viewport has scrolled 20points. 
 */
export const initializeBackToTop = () => {
	let backToTop = document.getElementById('backToTop')
	backToTop.addEventListener('click', () => {
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0; // For Safari
	})
	window.onscroll = function () { scrollFunction() };
}

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		backToTop.classList.add('show')
	} else {
		backToTop.classList.remove('show')
	}
}
