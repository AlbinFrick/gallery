
const scrollToTop = () => {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0;
}

export default initializeScrollToTop = () => {
	document.querySelector('.backToTop').on('click', scrollToTop)
}