import galleryCardTp from './templates/img-card.hbs';
import './css/common.css';
import './css/lightbox.css';
import './js/lightbox';
import ImgApiService from './js/apiService';
import LoadMoreBtn from './js/components/load-more-btn';

let scrollingTo = 0;
const refs = {
  searchForm: document.querySelector('.js-search-form'),
  galleryContainer: document.querySelector('.js-gallery-container'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const toUpBtn = new LoadMoreBtn({
  selector: '[data-action="to-up"]',
  hidden: true,
});

const imgApiService = new ImgApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onloadMoreBtn);
toUpBtn.refs.button.addEventListener('click', scrollToUp);

function scrollToUp () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function onSearch(e) {
  e.preventDefault();
  scrollingTo = 0;
  imgApiService.query = e.currentTarget.elements.query.value;
  
  if (imgApiService.query === '') {
    return alert('Введите корректный запрос');
  }

  loadMoreBtn.show();
  toUpBtn.show();
  imgApiService.resetPage();
  clearImagesContainer();
  fetchImages();
}

function onloadMoreBtn(e) {
  fetchImages()
}

function fetchImages() {  
  loadMoreBtn.disable();  
  imgApiService.fetchPictures().then(images => {
    appendImagesMarkup(images);
    loadMoreBtn.enable();
    windowsScrolling();   
  });  
}

function appendImagesMarkup(images) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', galleryCardTp(images));
}

function clearImagesContainer() {
  refs.galleryContainer.innerHTML = '';
}


// const totalScrollHeight = document.body.clientHeight;
// console.log(totalScrollHeight);
function windowsScrolling() {
    window.scrollTo({
    top: scrollingTo,
    behavior: 'smooth',
  });
  scrollingTo = refs.galleryContainer.lastElementChild.offsetTop + 256;  
  }

