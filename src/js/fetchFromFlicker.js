import { buildImageCard } from "./gallary"

const setErrorMessage = (message) => {
	document.getElementById('errorMessage').innerHTML = message
}

export const fetchImages = (page, search) => {
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

	}).catch((error) => {
		console.log(error)
		setErrorMessage(error.message)
		setLoaderMessage('')
	})
}