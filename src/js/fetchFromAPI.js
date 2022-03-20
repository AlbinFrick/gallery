import { buildImageCard } from "./gallery"
import { setErrorMessage, setLoaderMessage } from "./utils"
import { lazyload } from "./Lazyload"

let page = 0;

/**
 * Fetches imageURLs and title from the API
 * 
 * @param {*} page - what page the images should be fetched
 * @param {*} search - a tag used to find the categories of images
 */
const fetchImages = (page, search) => {
	fetch(`http://localhost:8080/search-image/${search}/30/${page}`).then((res) => {
		if (!res.ok) {
			throw new Error(`${res.status}, Whoops kunde inte hämta dina bilder. Prova ett nytt sökord eller ladda om sidan`);
		}
		setErrorMessage('')
		return res.json()
	}).then((response) => {
		setLoaderMessage('')
		response.map((photo) => {
			buildImageCard(photo)
		})
		lazyload()
		return response;

	}).catch((error) => {
		console.error(error)
		setErrorMessage(error.message)
		setLoaderMessage('')
	})
}

export const fetchNextPage = (search) => {
	page++
	fetchImages(page, search)
}