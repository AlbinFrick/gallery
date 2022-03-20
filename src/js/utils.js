/**
 * Small utility function used through out the application.
 */

export const setErrorMessage = (message) => {
	document.getElementById('errorMessage').innerHTML = message
}
export const setLoaderMessage = (message) => {
	document.getElementById('loading').innerHTML = message
}
export const setSearchLabelMessage = (message) => {
	document.getElementById('searchLabel').firstChild.textContent = message
}