

const ref = {
    galleryList: document.querySelector('.js-gallery-container'),
    lightbox: document.querySelector('.js-lightbox'),
    imgInLightbox: document.querySelector('.lightbox__image'),
    }
  
  
  ref.galleryList.addEventListener('click', appearanceOfLightbox);
  
  
  let activImagesRefs = [];
  let currentPicture = {};
  
  function appearanceOfLightbox (event) {
    event.preventDefault();
    
    if (event.target.nodeName !== 'IMG') {
        return
    }
    ref.lightbox.classList.add('is-open');
    openImgInModal(event.target);   
    
    ref.lightbox.addEventListener('click', clickInOverflow);
    document.addEventListener('keydown', pressEscOrArrows);
  
    activImagesRefs = document.querySelectorAll('.gallery__image'); 
    currentPicture = event.target;         
  }
  
  function openImgInModal (obj){
    ref.imgInLightbox.setAttribute("src", obj.dataset.source);   
  }
  
  function closureOfLightbox () {
    ref.lightbox.removeEventListener('click', clickInOverflow);
    document.removeEventListener('keydown', pressEscOrArrows);
    ref.imgInLightbox.setAttribute("src", '');
    ref.imgInLightbox.setAttribute("alt", '');    
    ref.lightbox.classList.remove('is-open');    
  }
  
  function clickInOverflow (event) {
    if (event.target.nodeName === 'IMG') {
        return nextImg (currentPicture);
    }
   closureOfLightbox();
  }
  
  function pressEscOrArrows (event) {
    if(event.key === 'Escape') {
        closureOfLightbox()
    } else if(event.key === 'ArrowRight'){
        nextImg(currentPicture);
    } else if(event.key === 'ArrowLeft'){
        previosImg(currentPicture);
    }        
  }
  
  function nextImg (objOfImg) {   
    const arr = [];
   
    activImagesRefs.forEach(img => arr.push(img.dataset.source));
    const currentIndex = arr.indexOf(objOfImg.dataset.source);
    const nextIndex = currentIndex + 1;
        if(currentIndex === arr.length - 1){
          currentPicture = activImagesRefs[0]
        } else {
            currentPicture = activImagesRefs[nextIndex]
        }
        openImgInModal(currentPicture);    
  }
  
  function previosImg(objOfImg){
    const arr = [];
   
    activImagesRefs.forEach(img => arr.push(img.dataset.source));
    const currentIndex = arr.indexOf(objOfImg.dataset.source);
    const nextIndex = currentIndex - 1;
        if(currentIndex === 0){
            currentPicture = activImagesRefs[arr.length - 1]
        } else {
            currentPicture = activImagesRefs[nextIndex]
        }
        openImgInModal(currentPicture);
    
  }
  