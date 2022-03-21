import '../style/style.scss';
import { initializeBackToTop } from './backToTop';
import { searchForm } from './form';
import { preloadLoadingImg } from './preload'

//preloads the loading image to ensure that the loading SVG is show on first search 
preloadLoadingImg()

searchForm();
initializeBackToTop();