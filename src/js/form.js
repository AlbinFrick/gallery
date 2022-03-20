import { setSearchLabelMessage, setLoaderMessage } from "./utils";
import { fetchNextPage } from "./fetchFromAPI";

/**
 * Adds an event listener on submit on the form. 
 * Fetches new images according to the search query
 */
export const searchForm = () => {
	let form = document.getElementById('form');
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		let search = getSearchQuery()
		formValidation(search);
		resetGallery()
		document.getElementById('loading').setAttribute('class', 'show');
		setLoaderMessage('Hämtar bilder från Flickr...')
		fetchNextPage(search)
	})
}


/**
 * Checks is the input has a value. 
 * If not show an error message to the user
 *  
 * @param search 
 * @returns 
 */
const formValidation = (search) => {
	if (!search) {
		setSearchLabelMessage('Skriva något i sökfältet för att se bilder')
		document.getElementById('searchLabel').classList.add('error')
		return
	}
	setSearchLabelMessage('Sök på en kategori')
	document.getElementById('searchLabel').classList.remove('error')
}


const getSearchQuery = () => {
	return document.getElementById('search').value;
}

const resetGallery = () => {
	document.getElementById('gallery').innerHTML = ''
}
