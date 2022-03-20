import '../style/style.scss';
import { searchForm } from './form';

searchForm();

// Sets click event to scroll back to top
let backToTop = document.getElementById('backToTop')
backToTop.addEventListener('click', () => {
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0; // For Safari
})

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		backToTop.classList.add('show')
	} else {
		backToTop.classList.remove('show')
	}
}