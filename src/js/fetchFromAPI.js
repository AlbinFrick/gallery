import { buildImageCard } from "./gallary"
import { setErrorMessage, setLoaderMessage } from "./utils"
import { lazyload } from "./Lazyload"

let page = 0;

const fetchImages = (page, search) => {
	fetch(`http://localhost:8080/search-image/${search}/40/${page}`).then((res) => {
		if (!res.ok) {
			throw new Error(`${res.status}, Whoops kunde inte hämta dina bilder.`);
		}
		setErrorMessage('')
		return res.json()
	}).then((response) => {
		setLoaderMessage('')
		response.map((photo) => {
			buildImageCard(photo)
		})
		lazyload()
		document.addEventListener("scroll", lazyload);
		window.addEventListener("resize", lazyload);
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