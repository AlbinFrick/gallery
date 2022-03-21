
import loading from '../assets/loading.svg'

export const preloadLoadingImg = () => {
	var link = document.createElement('link');
	link.setAttribute('as', 'image');
	link.setAttribute('href', loading)
	link.rel = 'preload';
	document.head.appendChild(link);
}